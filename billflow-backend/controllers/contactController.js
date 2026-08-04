import Contact from "../models/Contact.js";

// ─────────────────────────────────────────
// CREATE CONTACT
// ─────────────────────────────────────────
export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      ...req.body,
      companyId: req.companyId,
    });

    res.status(201).json({
      success: true,
      message: "Contact added successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET ALL CONTACTS (search/filter ke saath)
// ─────────────────────────────────────────
export const getContacts = async (req, res) => {
  try {
    const { search, contactType } = req.query;

    const query = { companyId: req.companyId };

    if (contactType) query.contactType = contactType;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET SINGLE CONTACT
// ─────────────────────────────────────────
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, companyId: req.companyId });

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// UPDATE CONTACT
// ─────────────────────────────────────────
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, companyId: req.companyId },
      req.body,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// DELETE CONTACT
// ─────────────────────────────────────────
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, companyId: req.companyId });

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// STATS — All Contacts | To Collect | To Pay
// ─────────────────────────────────────────
export const getContactStats = async (req, res) => {
  try {
    const contacts = await Contact.find({ companyId: req.companyId });

    const total = contacts.length;
    const toCollect = contacts
      .filter((c) => c.balanceType === "collect")
      .reduce((sum, c) => sum + c.openingBalance, 0);
    const toPay = contacts
      .filter((c) => c.balanceType === "pay")
      .reduce((sum, c) => sum + c.openingBalance, 0);

    res.status(200).json({ success: true, stats: { total, toCollect, toPay } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
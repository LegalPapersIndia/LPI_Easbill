export const lookupGstin = async (req, res) => {
  try {
    const { gstin } = req.params;

    if (!gstin || gstin.length !== 15) {
      return res.status(400).json({ success: false, message: "Invalid GSTIN" });
    }

    const response = await fetch(`https://gstinapi.in/v1/gstin/${gstin}`, {
      headers: { "x-api-key": process.env.GSTINAPI_KEY },
    });

    const data = await response.json();
    console.log("GSTINAPI response:", response.status, data);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.error || data.message || "GSTIN verify nahi ho paya",
      });
    }

    res.status(200).json({ success: true, data: data.data }); // ← sirf actual details bhejo, poora wrapper nahi
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const sendError = (req: any, res: any, error_message: any) => {
  res.status(400).json({ success: false, error: error_message });
};

export const sendSuccess = (req:any, res: any, data: any) => {
    res.status(200).json({ success: true, data });
}
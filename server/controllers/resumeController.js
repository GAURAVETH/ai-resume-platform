import fs from "fs";

import Resume
    from "../models/Resume.js";

import extractText
    from "../utils/extractText.js";

export const uploadResume =
    async (req, res) => {

        try {

            // EXTRACT TEXT
            const extractedText =
                await extractText(
                    req.file.path
                );

            // SAVE IN DATABASE
            const resume =
                await Resume.create({

                    fileName:
                        req.file.filename,

                    extractedText
                });

            // DELETE FILE AFTER 5 SECONDS
            setTimeout(() => {

                fs.unlink(
                    req.file.path,

                    (err) => {

                        if (err) {

                            console.log(
                                "Delete Error:",
                                err
                            );

                        } else {

                            console.log(
                                "File Deleted:",
                                req.file.filename
                            );
                        }
                    }
                );

            }, 5000);

            res.json({

                success: true,

                resume
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Resume Upload Failed"
            });
        }
    };
const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "TalentFlow API is running",
  });
});

app.get("/api/jobs", async (req, res) => {
  try {
    const [jobs] = await db.query(
      "SELECT * FROM jobs ORDER BY created_at DESC"
    );

    res.json(jobs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
});

app.post("/api/applications", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      qualification,
      experience,
      skills,
      job_id,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO applications
      (name, email, phone, location, qualification, experience, skills, job_id, stage)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        phone,
        location,
        qualification,
        experience,
        skills,
        job_id,
        "Applied",
      ]
    );

    res.status(201).json({
      message: "Application submitted successfully",
      applicationId: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to submit application",
    });
  }
});

app.get("/api/applications", async (req, res) => {
  try {
    const [applications] = await db.query(`
      SELECT
        a.*,
        j.title AS job_title
      FROM applications a
      LEFT JOIN jobs j
        ON a.job_id = j.id
      ORDER BY a.created_at DESC
    `);

    res.json(applications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
});

app.put("/api/applications/:id/stage", async (req, res) => {
  try {
    const { stage } = req.body;
    const { id } = req.params;

    const allowedStages = [
      "Applied",
      "Screening",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ];

    if (!allowedStages.includes(stage)) {
      return res.status(400).json({
        message: "Invalid stage",
      });
    }

    await db.query(
      "UPDATE applications SET stage = ? WHERE id = ?",
      [stage, id]
    );

    res.json({
      message: "Candidate stage updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update candidate stage",
    });
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      employment_type,
      description,
      requirements,
    } = req.body;

    if (!title || !location || !description) {
      return res.status(400).json({
        message: "Title, location and description are required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO jobs
      (title, department, location, employment_type, description, requirements, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        department,
        location,
        employment_type,
        description,
        requirements,
        "Open", // Default status
      ]
    );

    res.status(201).json({
      message: "Job created successfully",
      jobId: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create job",
    });
  }
});

// UPDATE JOB
app.put("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      department,
      location,
      employment_type,
      description,
      requirements,
      status,
    } = req.body;

    const [result] = await db.query(
      `UPDATE jobs
       SET title = ?,
           department = ?,
           location = ?,
           employment_type = ?,
           description = ?,
           requirements = ?,
           status = ?
       WHERE id = ?`,
      [
        title,
        department,
        location,
        employment_type,
        description,
        requirements,
        status,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json({
      message: "Job updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update job",
    });
  }
});

// UPDATE JOB STATUS (separate endpoint for just status)
app.put("/api/jobs/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Open", "Closed", "On Hold"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be Open, Closed, or On Hold",
      });
    }

    const [result] = await db.query(
      "UPDATE jobs SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json({
      message: `Job ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update job status",
    });
  }
});

// DELETE JOB
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM jobs WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete job",
    });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TalentFlow API running on port ${PORT}`);
});
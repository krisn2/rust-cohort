# 📄 Resume PDF Generator (Rust + LaTeX + Actix Web)

This is a production-ready backend service that takes resume data in JSON format and generates a downloadable PDF resume using LaTeX.

Built using:

- 🦀 Rust
- 🚀 Actix Web
- 📄 LaTeX (via `pdflatex`)
- 📦 Tempfile (in-memory safe file system)
- ⚡ Async Process

---

## 🔧 Features

✅ Accepts structured resume data (personal info, education, projects, etc.)  
✅ Converts LaTeX into PDF using `pdflatex`  
✅ Uses per-request temp directories (no race condition)  
✅ Returns PDF as downloadable HTTP response  
✅ Fully async and ready for production  
✅ Works on Windows, Linux, and Mac (with `pdflatex` installed)

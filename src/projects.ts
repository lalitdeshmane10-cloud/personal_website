interface ProjectData { id: string; discipline: string; title: string; subtitle: string; description: string; highlights: string[]; results: string[]; tags: string[]; url: string; problem: string; method: string[]; links?: { label: string; url: string }[] }

export const projects: ProjectData[] = [
  {
    "id": "wavecatboost",
    "discipline": "Time-series forecasting",
    "title": "WaveCatBoost",
    "subtitle": "Wavelet-Based Machine Learning for Air Quality Forecasting",
    "description": "A time-series forecasting project exploring the integration of wavelet-based signal decomposition and CatBoost machine learning for air quality prediction.",
    "highlights": [
      "Time-series analysis and forecasting.",
      "Wavelet-based signal decomposition.",
      "Feature processing and predictive modelling.",
      "CatBoost-based machine learning.",
      "Experimental evaluation of forecasting approaches."
    ],
    "results": [],
    "tags": [
      "Wavelets",
      "CatBoost",
      "Time Series",
      "Air Quality"
    ],
    "url": "https://charanponaganti.github.io/wavecatboost-learn/#/",
    "problem": "How can wavelet decomposition help a machine learning model forecast air quality from time-series data?",
    "method": [
      "Signal decomposition",
      "Feature processing",
      "CatBoost forecasting",
      "Experimental evaluation"
    ]
  },
  {
    "id": "dephides",
    "discipline": "Cybersecurity",
    "title": "Dephides: Phishing URL Detection System",
    "subtitle": "Hybrid Machine Learning and Deep Learning for Cybersecurity",
    "description": "Developed a real-time phishing URL detection system combining deep learning, traditional machine learning and browser-based threat assessment.",
    "highlights": [
      "Developed a Chrome Extension using Manifest V3.",
      "Built a FastAPI-based REST API.",
      "Integrated service workers, URL caching and threat intelligence.",
      "Designed a hybrid detection pipeline using CNN, RNN, BiRNN and Attention architectures.",
      "Integrated character-level embeddings and lexical features."
    ],
    "results": [
      "Trained and evaluated models on 415,000 URLs.",
      "Achieved 97.4% accuracy and 98.1% precision with CNN and BiRNN architectures.",
      "Outperformed traditional ensemble methods by approximately 8% on the reported dataset."
    ],
    "tags": [
      "Python",
      "CNN",
      "RNN",
      "BiRNN",
      "Attention",
      "FastAPI",
      "Chrome Extension",
      "Machine Learning"
    ],
    "url": "https://bit.ly/4o7c3LO",
    "problem": "How can a browser extension assess phishing risk in real time using URL patterns and threat intelligence?",
    "method": [
      "Browser threat assessment",
      "URL features and embeddings",
      "Hybrid detection"
    ]
  },
  {
    "id": "mri",
    "discipline": "Computer vision",
    "title": "MRI Brain Tumor Detection",
    "subtitle": "Optimization-Based Deep Learning for Medical Image Classification",
    "description": "Developed an MRI-based brain tumor classification pipeline integrating image enhancement, optimization-based segmentation, deep feature fusion and an optimized LSTM classifier.",
    "highlights": [
      "CLAHE-based image enhancement.",
      "AOA-based tumor segmentation.",
      "MobileNetV2 and EfficientNet-B0 feature fusion.",
      "MOAOA-optimized LSTM classification."
    ],
    "results": [
      "Evaluated on an augmented dataset of 1,260 brain MRI images.",
      "Achieved 95.50% accuracy and 95.52% F1-score.",
      "Compared performance against SVM, ResNet-50, Inception-V3, MobileNetV2 and EfficientNet-B0."
    ],
    "tags": [
      "Python",
      "Deep Learning",
      "CNN",
      "LSTM",
      "Computer Vision",
      "Image Processing",
      "Optimization"
    ],
    "url": "https://bit.ly/4uLjw5J",
    "problem": "How can image enhancement, segmentation, and feature fusion support brain tumor classification from MRI images?",
    "method": [
      "CLAHE enhancement",
      "AOA segmentation",
      "Feature fusion",
      "Optimized LSTM"
    ]
  },
  {
    "id": "automl",
    "discipline": "Full-stack ML",
    "title": "AutoML Web Platform",
    "subtitle": "Automated Machine Learning and Exploratory Data Analysis",
    "description": "Built a full-stack AutoML platform that automates preprocessing, model training, evaluation and model selection for classification and regression workflows.",
    "highlights": [
      "Developed a FastAPI backend and React frontend.",
      "Automated preprocessing, including imputation, encoding and scaling.",
      "Implemented seven traditional machine learning models.",
      "Integrated adaptive cross-validation and best-model selection.",
      "Developed an interactive EDA dashboard.",
      "Implemented outlier detection, feature importance and correlation analysis.",
      "Developed REST APIs for model lifecycle management.",
      "Used Recharts for interactive visualization."
    ],
    "results": [],
    "tags": [
      "Python",
      "FastAPI",
      "React",
      "Recharts",
      "Scikit-learn",
      "Pandas"
    ],
    "url": "https://automl-one.vercel.app/",
    "problem": "How can users move from a raw dataset to an evaluated model with fewer manual steps?",
    "method": [
      "Preprocessing",
      "Adaptive cross-validation",
      "Model selection"
    ]
  },
  {
    "id": "gradeops",
    "discipline": "Document intelligence",
    "title": "GradeOps: AI-Powered Exam Grading System",
    "subtitle": "Intelligent Automated Evaluation of Handwritten Answer Scripts",
    "description": "Developed a full-stack AI-powered grading platform that automates handwritten answer evaluation using OCR, vision models and LLM-based grading workflows.",
    "highlights": [
      "Developed a full-stack platform using React, FastAPI/Node.js, PostgreSQL and MongoDB.",
      "Implemented OCR and vision pipelines using PyTorch and Hugging Face.",
      "Integrated Nougat and Qwen-VL.",
      "Developed structured extraction and rubric-aligned grading workflows.",
      "Supported partial-credit evaluation and feedback generation.",
      "Implemented plagiarism detection.",
      "Included teaching-assistant review and override workflows."
    ],
    "results": [],
    "tags": [
      "Python",
      "FastAPI",
      "React",
      "PyTorch",
      "Hugging Face",
      "MongoDB",
      "PostgreSQL",
      "OCR",
      "LLMs"
    ],
    "url": "https://bit.ly/4vlifSw",
    "problem": "How can handwritten answers be extracted and evaluated against a rubric while allowing teaching assistants to review grades?",
    "method": [
      "OCR and vision",
      "Structured extraction",
      "Rubric-based grading",
      "Teaching assistant review"
    ]
  },
  {
    "id": "autolyrics",
    "discipline": "Speech recognition",
    "title": "AutoLyrics",
    "subtitle": "LoRA Fine-Tuned Whisper for Song Lyric Transcription",
    "description": "Developed a singing-lyrics transcription pipeline by fine-tuning a 245M-parameter Whisper model using Low-Rank Adaptation (LoRA).",
    "highlights": [
      "Fine-tuned Whisper using LoRA.",
      "Integrated 8-bit quantization across attention matrices.",
      "Used FP16 mixed precision and gradient checkpointing.",
      "Built an interactive Gradio web application.",
      "Integrated 3-beam search for inference."
    ],
    "results": [
      "Reduced trainable weights to 1.44%.",
      "Achieved an 82.14% reduction in Word Error Rate."
    ],
    "tags": [
      "Python",
      "Whisper",
      "LoRA",
      "PyTorch",
      "Quantization",
      "Gradio",
      "Deep Learning"
    ],
    "url": "https://bit.ly/4x3wIo5",
    "problem": "How can a speech recognition model be adapted to transcribe singing with a small share of trainable weights?",
    "method": [
      "Quantized Whisper",
      "LoRA fine-tuning",
      "Beam search",
      "Gradio interface"
    ]
  }
]

export type Project = (typeof projects)[number]


window.siteContent = {
  profile: {
    name: "DOMINIC MAKAZA",
    role: "Consultant, Learner, Builder",
    summary: "This website works as a living CV. Use it to present your background, highlight new work, upload documents, and keep a daily record of progress.",
    about: "Write a short introduction here. You can describe your background, values, career goals, and the kind of work you want people to know you for. Because this site is content-driven, you can keep refreshing it as your experience grows.",
    image: "assets/photos/artemis-ii-liftoff.jpg",
    facts: [
      { label: "Base", value: "Your City" },
      { label: "Focus", value: "Your Expertise" },
      { label: "Open To", value: "Work, Study, Projects" }
    ],
    stats: [
      { label: "Years of Experience", value: "03+" },
      { label: "Projects", value: "12" },
      { label: "Certificates", value: "05" }
    ],
    socials: [
      {
        label: "LinkedIn",
        handle: "linkedin.com/in/dominic-makaza",
        href: "https://www.linkedin.com/in/dominic-makaza/"
      },
      {
        label: "X",
        handle: "@dominicmakaza",
        href: "https://x.com/dominicmakaza"
      }
    ],
    contacts: [
      { label: "Email", value: "you@example.com", href: "mailto:you@example.com" },
      { label: "Phone", value: "+91 00000 00000", href: "tel:+910000000000" },
      { label: "LinkedIn", value: "linkedin.com/in/dominic-makaza", href: "https://www.linkedin.com/in/dominic-makaza/" },
      { label: "X", value: "x.com/dominicmakaza", href: "https://x.com/dominicmakaza" },
      { label: "Location", value: "India" }
    ]
  },
  timeline: [
    {
      period: "2026",
      title: "Started this living CV website",
      description: "Created a personal website that can be updated daily with photos, documents, and short activity notes."
    },
    {
      period: "2025",
      title: "Add your most important recent milestone",
      description: "Replace this with your job, degree, internship, certification, or major project."
    },
    {
      period: "Earlier",
      title: "Add your earlier journey",
      description: "Use the timeline to show how your work and learning have grown over time."
    }
  ],
  photos: [
    {
      title: "Artemis II Liftoff",
      image: "assets/photos/artemis-ii-liftoff.jpg"
    },
    {
      title: "Project Snapshot",
      image: "assets/photos/project-placeholder.svg"
    },
    {
      title: "Event or Achievement",
      image: "assets/photos/achievement-placeholder.svg"
    }
  ],
  documents: [
    {
      type: "CV",
      title: "Resume PDF",
      description: "Replace this sample document with your real CV or resume PDF.",
      file: "assets/documents/sample-cv.txt"
    },
    {
      type: "Certificate",
      title: "Supporting Document",
      description: "Use this section for certificates, transcripts, portfolios, or recommendation letters.",
      file: "assets/documents/sample-document.txt"
    }
  ],
  journal: {
    intro: "Use this feed like a daily logbook. Each entry can hold one short reflection, a few highlights, and links to the photos or documents you added that day.",
    prompts: [
      "What did I finish today?",
      "What did I learn or improve?",
      "Which photo or file should I attach?"
    ],
    featuredLabel: "Featured Entry"
  },
  updates: [
    {
      date: "2026-04-15",
      featured: true,
      tag: "Website Setup",
      tags: ["Design", "Setup", "Launch Prep"],
      mood: "Fresh Start",
      title: "Prepared the first version of my personal CV site",
      lead: "Built the base layout for a personal site that feels like both a CV and a running journal.",
      body: "Set up a homepage with sections for biography, timeline, documents, photos, and daily updates. The feed is designed so each day can become a small record of progress instead of just a static resume line.",
      image: "assets/photos/project-placeholder.svg",
      highlights: ["Homepage structure ready", "Content file created", "Documents and photos supported"],
      attachments: [
        { label: "CV Placeholder", href: "assets/documents/sample-cv.txt" },
        { label: "Project Snapshot", href: "assets/photos/project-placeholder.svg" }
      ]
    },
    {
      date: "2026-04-14",
      tag: "Documents",
      tags: ["CV", "Certificates", "Files"],
      mood: "Organized",
      title: "Added room for CV and certificates",
      lead: "Created a simple pattern for attaching files so the website can grow as your record grows.",
      body: "This area can be updated any day by changing file names in content.js and placing the files inside assets/documents. That makes it easy to keep replacing old versions with newer certificates, resumes, and supporting files.",
      highlights: ["Reusable document section", "Simple file links", "Ready for PDF uploads"],
      attachments: [
        { label: "Sample Document", href: "assets/documents/sample-document.txt" }
      ]
    },
    {
      date: "2026-03-28",
      tag: "Photos",
      tags: ["Gallery", "Visual Story", "Achievements"],
      mood: "Visual",
      title: "Planned a simple photo gallery",
      lead: "Kept space for visual proof of work, events, milestones, and behind-the-scenes progress.",
      body: "You can keep uploading new photos and show a visual record of your work, events, or achievements. The journal feed can also point to the same photos so a single day feels more complete and more personal.",
      image: "assets/photos/achievement-placeholder.svg",
      highlights: ["Gallery added", "Works with SVG, JPG, PNG", "Good for achievements and events"],
      attachments: [
        { label: "Achievement Image", href: "assets/photos/achievement-placeholder.svg" }
      ]
    },
    {
      date: "2026-03-07",
      tag: "Planning",
      tags: ["Roadmap", "Career", "Writing"],
      mood: "Thoughtful",
      title: "Mapped out how the site should grow over time",
      lead: "Sketched out a rhythm for writing small updates so the website stays active and useful.",
      body: "Planned to use the site as a running CV, a simple archive, and a personal progress feed. That means each entry can capture one useful thing from the day, even if it is small.",
      highlights: ["Defined the site purpose", "Made daily updates easier", "Prepared for long-term use"],
      attachments: [
        { label: "Sample CV", href: "assets/documents/sample-cv.txt" }
      ]
    }
  ]
};


document.addEventListener("DOMContentLoaded", function () {

    // 1. Animated technology background
    const canvas = document.getElementById("tech-bg");
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    function drawBackground() {
        const light = document.body.classList.contains("day-mode");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = light
                ? "rgba(0,115,177,0.7)"
                : "rgba(100,200,255,0.7)";
            ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);

                    ctx.strokeStyle = light
                        ? `rgba(0,115,177,${(1 - distance / 150) * 0.3})`
                        : `rgba(100,200,255,${(1 - distance / 150) * 0.5})`;

                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawBackground);
    }

    resizeCanvas();
    drawBackground();
    window.addEventListener("resize", resizeCanvas);


    // 2. Rotating professional titles
    const titles = [
        "Co-founder & Chief Product Officer",
        "Product Strategy & Leadership",
        "Building Digital Products That Matter",
        "11+ Years in Technology"
    ];

    const titleElements = titles.map((_, i) =>
        document.getElementById(`changing-title-${i + 1}`)
    ).filter(Boolean);

    let currentTitle = 0;

    titleElements.forEach((element, i) => {
        element.textContent = titles[i];
        element.classList.toggle("active", i === 0);
    });

    if (titleElements.length > 1) {
        setInterval(() => {
            titleElements[currentTitle].classList.remove("active");

            currentTitle = (currentTitle + 1) % titleElements.length;

            titleElements[currentTitle].classList.add("active");
        }, 3000);
    }


    // 3. Dark and light theme
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");

    function setTheme(light) {
        document.body.classList.toggle("day-mode", light);
        document.body.classList.toggle("dark-mode", !light);

        themeIcon.classList.toggle("fa-sun", !light);
        themeIcon.classList.toggle("fa-moon", light);
    }

    const hour = new Date().getHours();
    setTheme(hour >= 6 && hour < 18);

    themeToggle.addEventListener("click", () => {
        setTheme(!document.body.classList.contains("day-mode"));
    });


    // 4. Chat elements
    const chatIcon = document.getElementById("chat-icon");
    const chatClose = document.getElementById("chat-close");
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");
    const typingIndicator = document.getElementById("typing-indicator");
    const chatOverlay = document.getElementById("chat-overlay");
    const openChatLink = document.getElementById("open-chat");

    function openChat() {
        document.body.classList.add("chat-open");

        if (window.innerWidth <= 768) {
            chatOverlay.style.display = "block";
        }

        setTimeout(() => userInput.focus(), 300);
    }

    function closeChat() {
        document.body.classList.remove("chat-open");
        chatOverlay.style.display = "none";
    }

    chatIcon.addEventListener("click", openChat);
    chatClose.addEventListener("click", closeChat);
    chatOverlay.addEventListener("click", closeChat);

    if (openChatLink) {
        openChatLink.addEventListener("click", event => {
            event.preventDefault();
            openChat();
        });
    }


    // 5. Display chat messages
    function addMessage(message, sender) {
        const element = document.createElement("div");

        element.classList.add("message", `${sender}-message`);
        element.textContent = message;

        chatMessages.appendChild(element);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }


    // 6. Professional information and chatbot responses
    const responses = [

        {
            keywords: ["who are you", "your name", "introduce yourself", "about anmol"],
            answer: "I'm Anmol Chalise, a Product Leader and Co-founder & Chief Product Officer at Gurkha Labs. I have 11+ years of experience in technology, including 7+ years in product management, product ownership, and product leadership."
        },

        {
            keywords: ["product experience", "product management", "product background", "product leader", "product career", "chief product officer", "cpo"],
            answer: "Anmol has 7+ years of experience in product management, product ownership, and product leadership. His experience includes product strategy, roadmap development, product discovery, stakeholder management, cross-functional team leadership, and end-to-end product development."
        },

        {
            keywords: ["experience", "years of experience", "11 years", "technology background", "career"],
            answer: "Anmol has 11+ years of overall technology experience, including 7+ years in product management and leadership. His career began in software development before progressing into product management, product ownership, and product leadership."
        },

        {
            keywords: ["software development", "developer", "engineering", "technical background", "software architecture"],
            answer: "Anmol started his career in software development and has around 3 years of software development experience. This technical foundation helps him bridge business requirements, product strategy, and engineering execution."
        },

        {
            keywords: ["gurkha labs", "company", "where do you work", "current role", "cofounder", "co-founder"],
            answer: "Anmol is the Co-founder & Chief Product Officer at Gurkha Labs, a senior-led software studio helping startups and organizations design, build, and scale web applications, mobile apps, AI-powered products, and custom software."
        },

        {
            keywords: ["services", "what do you do", "what does gurkha labs do", "offerings", "solutions"],
            answer: "Gurkha Labs provides web application development, mobile app development, AI integration, SaaS development, custom software engineering, product development, UI/UX implementation, API development, cloud solutions, and technical consulting."
        },

        {
            keywords: ["ai", "artificial intelligence", "machine learning", "ai products"],
            answer: "Anmol works with AI-powered product development and practical AI integration. Gurkha Labs helps businesses build AI applications, integrate AI into existing products, and automate workflows."
        },

        {
            keywords: ["product strategy", "roadmap", "product discovery", "product development"],
            answer: "Anmol focuses on product strategy, product discovery, roadmap development, stakeholder alignment, and end-to-end product execution, bringing business goals, user needs, and technology together."
        },

        {
            keywords: ["islington", "external supervisor", "college", "students", "teaching", "mentor"],
            answer: "Alongside his work at Gurkha Labs, Anmol serves as an External Supervisor for Final Year Projects at Islington College, mentoring undergraduate students in research, software development, and product execution."
        },

        {
            keywords: ["team", "leadership", "manage", "cross functional"],
            answer: "Anmol has experience working with cross-functional teams across product, engineering, design, and business functions, helping teams align their goals and deliver meaningful digital products."
        },

        {
            keywords: ["hire", "job", "recruiter", "opportunity", "open to work", "looking for a job"],
            answer: "Anmol is an experienced product professional with a background in product management, product ownership, and product leadership. You can connect with him on LinkedIn to discuss relevant product leadership opportunities."
        },

        {
            keywords: ["project", "partnership", "collaboration", "business", "client"],
            answer: "Anmol is always open to discussing new product ideas, business opportunities, and meaningful collaborations. Gurkha Labs also partners with startups and organizations looking to build or scale web, mobile, and AI products."
        },

        {
            keywords: ["cost", "price", "budget", "quote"],
            answer: "Every project is different. After understanding your requirements, Gurkha Labs can provide a tailored proposal, estimated budget, and delivery timeline."
        },

        {
            keywords: ["contact", "email", "phone", "linkedin", "reach", "get in touch"],
            answer: "You can reach Anmol at anmolchalise.np@gmail.com, connect on LinkedIn at https://np.linkedin.com/in/anmolchalise, or visit https://gurkhalabs.com/."
        },

        {
            keywords: ["skills", "expertise", "tech stack", "specialization"],
            answer: "Anmol's expertise spans product strategy, product management, product ownership, software development, technical architecture, web and mobile applications, AI integration, stakeholder management, and cross-functional leadership."
        },

        {
            keywords: ["hello", "hi", "hey"],
            answer: "Hello! Great to meet you. I'm Anmol's AI assistant. Feel free to ask me about his product leadership experience, Gurkha Labs, technology background, or current work."
        }

    ];


    // 7. Find chatbot response
    function getBotResponse(message) {
        const text = message.toLowerCase().trim();

        for (const item of responses) {
            if (item.keywords.some(keyword => text.includes(keyword))) {
                return item.answer;
            }
        }

        return "Thanks for your question! I can help you learn about Anmol's 11+ years in technology, 7+ years in product management, his role at Gurkha Labs, product leadership experience, or his work at Islington College. You can also contact him at anmolchalise.np@gmail.com.";
    }


    // 8. Send chat message
    function sendMessage() {
        const message = userInput.value.trim();

        if (!message || sendButton.disabled) return;

        addMessage(message, "user");
        userInput.value = "";

        typingIndicator.style.display = "block";
        chatMessages.scrollTop = chatMessages.scrollHeight;

        sendButton.disabled = true;

        setTimeout(() => {
            typingIndicator.style.display = "none";

            addMessage(getBotResponse(message), "bot");

            sendButton.disabled = false;
        }, 1000);
    }

    sendButton.addEventListener("click", sendMessage);

    userInput.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

});

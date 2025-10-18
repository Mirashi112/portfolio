import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";



export default function PortfolioLanding() {

  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const imagesToLoad = [logo, "./assets/newsletter.jpg"];
    let loadedCount = 0;
    let mounted = true;

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!mounted) return;
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          // start fadeout after small pause, then remove loader after fade duration (1s)
          setTimeout(() => setFadeOut(true), 250); // small pause before fade
          setTimeout(() => {
            if (mounted) setLoading(false);
          }, 1250); // 250ms delay + 1000ms fade
        }
      };
      img.onerror = () => {
        // on error, still progress so loader doesn't hang
        if (!mounted) return;
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setTimeout(() => setFadeOut(true), 250);
          setTimeout(() => {
            if (mounted) setLoading(false);
          }, 1250);
        }
      };
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Typing animation setup
  const words = ["Web Developer", "Web Designer", "Graphics Designer", "Frontend Developer"];
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const erasingSpeed = 60;
  const delayBetweenWords = 2000;

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        if (displayText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, erasingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  // Progress animation
  const [progressDone, setProgressDone] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setProgressDone(true), 500);
    return () => clearTimeout(id);
  }, []);

  // Scroll refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const handleScrollTo = (ref) => {
    if (ref?.current) ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const linearSkills = [
    { name: "HTML", percent: 90 },
    { name: "CSS", percent: 75 },
    { name: "JavaScript", percent: 55 },
    { name: "Corel Draw", percent: 85 },
    { name: "React", percent: 75 },
    { name: "Photoshop", percent: 65 },
  ];

  const circularSkills = [
    { label: "Creativity", percent: 90 },
    { label: "Communication", percent: 65 },
    { label: "Problem Solving", percent: 75 },
    { label: "Teamwork", percent: 85 },
  ];

  // If still loading, show preloader overlay (preserves all original code after this)
  if (loading) {
    return (
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center bg-[#0c1a25] z-50 transition-opacity duration-1000 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Spinning logo — using Tailwind's animate-spin for a gentle spin */}
        <img
          src={logo}
          alt="Loading logo"
          className="w-28 h-28 mb-4 animate-spin drop-shadow-[0_0_20px_rgba(0,240,255,0.7)]"
          style={{ animationDuration: "2.8s" }}
        />
        <motion.p
          className="text-[#00f0ff] text-lg tracking-wide"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading your experience...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1a25] text-white antialiased scroll-smooth">
      {/* Header */}
      <header className="bg-[#09131c] sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo(homeRef);
            }}
            className="flex items-center space-x-2"
          >
            <img
              src={logo}
              alt="Portfolio Logo"
              className="w-40 h-40 object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-6 font-semibold">
            {[ 
              ["Home", homeRef],
              ["About", aboutRef],
              ["Services", servicesRef],
              ["Skills", skillsRef],
              ["Projects", projectsRef],
              ["Contact", contactRef],
            ].map(([name, ref]) => (
              <li key={name}>
                <a
                  href={`#${name.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(ref);
                  }}
                  className="hover:text-[#00f0ff] transition-colors"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <MobileMenu
              onSelectHome={() => handleScrollTo(homeRef)}
              onSelectAbout={() => handleScrollTo(aboutRef)}
              onSelectServices={() => handleScrollTo(servicesRef)}
              onSelectSkills={() => handleScrollTo(skillsRef)}
              onSelectProjects={() => handleScrollTo(projectsRef)}
              onSelectContact={() => handleScrollTo(contactRef)}
            />
          </div>
        </div>
      </header>

      {/* HERO */}
      <main
        ref={homeRef}
        className="flex flex-col-reverse lg:flex-row items-center justify-center px-6 sm:px-10 lg:px-20 py-16 lg:py-24"
      >
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Hello, It’s Me
            <br />
            <span className="text-[#00f0ff]">Eze Onyekachi Miracle</span>
            <br />
            And I’m a{" "}
            <span className="text-[#00f0ff] typing-animation">
              {displayText}
            </span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-gray-300 max-w-lg mx-auto lg:mx-0">
            I’m a web designer and graphics designer with over 3 years of experience in graphics design and 5 months in web design. I specialize in
            designing and developing beautiful, responsive web applications.
          </p>

          <div className="flex justify-center lg:justify-start space-x-4 text-2xl">
            {["whatsapp", "instagram", "facebook", "tiktok"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="hover:text-[#00f0ff] transition-colors"
              >
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo(aboutRef);
            }}
            className="inline-block mt-4 px-6 py-3 bg-[#00f0ff] text-[#09131c] font-bold rounded-md hover:bg-[#00c4ff] transition"
          >
            More About Me
          </a>
        </div>

        <div className="flex-1 flex justify-center mb-8 lg:mb-0">
          <div className="relative">
            <img
              src="/newsletter.jpg"
              alt="Profile"
              className="w-56 sm:w-64 md:w-72 lg:w-80 rounded-full border-8 border-[#0c1a25] shadow-[0_0_30px_10px_rgba(0,240,255,0.7)] object-cover"
            />
            <div className="absolute inset-0 rounded-full border-4 border-[#00f0ff] animate-pulse blur-md opacity-30"></div>
          </div>
        </div>
      </main>

      {/* ABOUT */}
      <motion.section
        ref={aboutRef}
        id="about"
        className="px-6 sm:px-10 lg:px-20 py-16 lg:py-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          {/* IMAGE - with animation */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            <img
              src="/newsletter.jpg"
              alt="About"
              className="w-56 sm:w-64 md:w-72 lg:w-80 rounded-full border-[10px] border-[#0c1a25] shadow-[0_0_30px_10px_rgba(0,240,255,0.7)] transition-transform duration-700 hover:scale-105 hover:shadow-[0_0_40px_15px_rgba(0,240,255,0.9)]"
            />
          </motion.div>

          {/* TEXT SECTION - animated, styled, beautiful */}
          <motion.div
            className="w-full max-w-5xl mx-auto text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: false }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
              About{" "}
              <span className="text-[#00f0ff] drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] hover:text-[#6ff9ff] transition-colors duration-300">
                Me
              </span>
            </h1>

            <div className="text-gray-300 leading-relaxed text-base md:text-lg space-y-6">
              <motion.p whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] transition-all duration-300">
                I’m a passionate{" "}
                <span className="text-[#00f0ff] font-semibold">Frontend Developer</span> and{" "}
                <span className="text-[#00f0ff] font-semibold">Graphics Designer</span> with a strong eye for
                detail and a love for creating visually engaging, user-centered web experiences. My journey
                into tech is fueled by creativity, curiosity, and the desire to turn ideas into functional,
                elegant designs that truly connect with users.
              </motion.p>

              <motion.p whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] transition-all duration-300">
                As a{" "}
                <span className="text-[#00f0ff] font-semibold">
                  B.Sc. graduate in Business Administration
                </span>
                , I bring a unique blend of technical and business insight to every project, understanding
                not just how to build beautiful interfaces, but also how to align them with brand goals, user
                behavior, and market needs.
              </motion.p>

              <motion.p whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] transition-all duration-300">
                I enjoy transforming concepts into responsive, interactive, and aesthetically pleasing web
                applications using modern frontend technologies. Beyond coding, I find inspiration in design,
                branding, and digital storytelling, combining creativity and strategy to deliver impactful
                digital experiences.
              </motion.p>
            </div>

            <motion.a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo(servicesRef);
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(0,240,255,0.8)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-block mt-10 px-10 py-3 bg-gradient-to-r from-[#00f0ff] to-[#00c4ff] 
               text-[#09131c] font-bold rounded-md transition-all duration-300
               hover:from-[#00d8ff] hover:to-[#00b8e6]"
            >
              View My Services
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* SERVICES */}
      <motion.section
        ref={servicesRef}
        id="services"
        className="px-6 sm:px-10 lg:px-20 py-16 lg:py-24 text-center"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <h2 className="text-3xl font-bold mb-12">
          My <span className="text-[#00f0ff]">Services</span>
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {[
            ["🎨", "Product Design"],
            ["💻", "Web Design"],
            ["🖼️", "Graphics Design"],
          ].map(([icon, title]) => (
            <div
              key={title}
              className="bg-[#112233] p-6 rounded-xl w-full sm:w-1/3 shadow-lg transition-transform hover:-translate-y-2 hover:shadow-[0_0_30px_10px_rgba(0,240,255,0.3)]"
            >
              <div className="text-4xl mb-4 text-[#00f0ff]">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 mb-4">
                I create visually appealing and user-friendly digital designs.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(contactRef);
                }}
                className="inline-block px-4 py-2 bg-[#00f0ff] text-[#09131c] font-bold rounded-full hover:bg-[#00c4ff]"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SKILLS */}
<motion.section
  ref={skillsRef}
  id="skills"
  className="px-6 sm:px-10 lg:px-20 py-16 lg:py-24 bg-[#0b1420]"
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: false }}
>
  <div className="max-w-6xl mx-auto">
    <h2 className="text-center text-4xl font-bold mb-12 text-white">
      My <span className="text-[#00f0ff]">Skills</span>
    </h2>

    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      {linearSkills.map((s) => (
        <motion.div
          key={s.name}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 30 },
            visible: { opacity: 1, scale: 1, y: 0 },
          }}
          className="bg-gradient-to-b from-[#101c2b] to-[#0a121c] border border-transparent hover:border-[#00f0ff]/50 transition-all duration-300 rounded-2xl p-6 text-center shadow-lg hover:shadow-[#00f0ff]/20 group"
        >
          <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-[#00f0ff]">
            {s.name}
          </h3>

          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="absolute inset-0" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#222"
                strokeWidth="2.5"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#grad)"
                strokeDasharray={`${s.percent}, 100`}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00f260" />
                  <stop offset="100%" stopColor="#0575e6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#00f0ff]">
              {s.percent}%
            </div>
          </div>

          <div className="text-gray-400 text-sm leading-relaxed">
           
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</motion.section>


      {/* PROJECTS */}
      <motion.section
        ref={projectsRef}
        id="projects"
        className="px-6 sm:px-10 lg:px-20 py-16 lg:py-24 text-center"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <h2 className="text-3xl font-bold mb-10">
          Latest <span className="text-[#00f0ff]">Projects</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {[
            // "https://media.geeksforgeeks.org/img-practice/prod/courses/345/Web/Content/javasc_1724254497.webp",
            // "https://media.geeksforgeeks.org/auth-dashboard-uploads/three90-rightbanner-20240708.png",
            // "https://media.geeksforgeeks.org/img-practice/prod/courses/241/Web/Content/FSRNL_1705410152.webp",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Project ${i + 1}`}
              className="w-full sm:w-1/3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        ref={contactRef}
        id="contact"
        className="px-6 sm:px-10 lg:px-20 py-16 lg:py-24 bg-[#09131c]"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold">
              Contact <span className="text-[#00f0ff]">Me</span>
            </h2>
            <p className="text-gray-300 mt-4">
              Let’s work together! Drop me a message anytime.
            </p>
            <div className="mt-4 space-y-2 text-gray-400">
              <p>Email: miraclejoel112@gmail.com</p>
              <p>Phone: 09162509938</p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form submitted (placeholder)");
            }}
            className="lg:w-1/2 space-y-4"
          >
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full p-4 bg-[#112233] rounded-md text-white"
              required
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-4 bg-[#112233] rounded-md text-white"
              required
            />
            <textarea
              placeholder="Enter Your Message"
              className="w-full p-4 bg-[#112233] rounded-md text-white h-32 resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-[#00f0ff] text-[#09131c] font-bold rounded-md hover:bg-[#00c4ff] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </motion.section>

      <footer className="text-center py-6 text-gray-400 bg-[#0c1a25] text-sm">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}

// Mobile dropdown menu
function MobileMenu({
  onSelectHome,
  onSelectAbout,
  onSelectServices,
  onSelectSkills,
  onSelectProjects,
  onSelectContact,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
  onClick={() => setOpen((v) => !v)}
  className="p-2 rounded-md bg-blue-600 border border-blue-800 text-white hover:bg-blue-700"
>
  <svg
    className="h-6 w-6 text-yellow-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
</button>


      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-[#09131c] rounded-md shadow-lg py-2 z-40 text-center">
          {[
            ["Home", onSelectHome],
            ["About", onSelectAbout],
            ["Services", onSelectServices],
            ["Skills", onSelectSkills],
            ["Projects", onSelectProjects],
            ["Contact", onSelectContact],
          ].map(([label, fn]) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                fn();
                setOpen(false);
              }}
              className="block px-4 py-2 hover:text-[#00f0ff]"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

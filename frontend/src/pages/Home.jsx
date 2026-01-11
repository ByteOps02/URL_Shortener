import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Modern URL Shortener
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Shorten, manage, and track your URLs with a fast, secure, and
            developer-friendly platform.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold
                         hover:bg-blue-700 transition shadow-lg"
            >
              Get Started Free
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-xl border border-gray-300 dark:border-gray-600
                         font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Long URLs are hard to share
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Long and messy URLs look unprofessional, are hard to remember,
              and break easily on social platforms. Managing multiple links
              without analytics is even worse.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-600">
              Shortify solves this
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Shortify turns long URLs into clean, shareable links while giving
              you full control, click tracking, and a simple dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">How it works</h2>

          <div className="grid gap-10 md:grid-cols-3">
            <Step
              number="01"
              title="Create an account"
              desc="Sign up in seconds and access your personal dashboard."
            />
            <Step
              number="02"
              title="Shorten your URL"
              desc="Paste any long URL and instantly get a short link."
            />
            <Step
              number="03"
              title="Track & manage"
              desc="Monitor clicks and manage all your links in one place."
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful features
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Feature
              title="⚡ Fast Performance"
              desc="Optimized backend ensures instant redirects and low latency."
            />
            <Feature
              title="🔐 Secure Authentication"
              desc="JWT-based authentication keeps your data protected."
            />
            <Feature
              title="📊 Click Analytics"
              desc="Track how many times your links are clicked."
            />
            <Feature
              title="🧩 User Dashboard"
              desc="Manage all your shortened URLs from one place."
            />
            <Feature
              title="🌗 Dark / Light Mode"
              desc="Switch themes for a comfortable viewing experience."
            />
            <Feature
              title="🚀 Developer Friendly"
              desc="Clean API structure and scalable architecture."
            />
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Who is it for?</h2>

          <div className="grid gap-8 md:grid-cols-4">
            <UseCase title="Developers" desc="Share clean links in projects." />
            <UseCase title="Students" desc="Submit neat URLs in assignments." />
            <UseCase title="Marketers" desc="Track link performance easily." />
            <UseCase title="Everyone" desc="Short links, no hassle." />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-bold">
            Start using Shortify today
          </h3>
          <p className="mt-4 opacity-90">
            Create an account and manage all your URLs with ease.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 px-10 py-4 rounded-xl bg-white
                       text-blue-600 font-semibold hover:opacity-90 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

/* COMPONENTS */

const Feature = ({ title, desc }) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow
               hover:shadow-xl transition"
  >
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="mt-3 text-gray-600 dark:text-gray-400">{desc}</p>
  </motion.div>
);

const Step = ({ number, title, desc }) => (
  <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow">
    <span className="text-blue-600 font-bold text-xl">{number}</span>
    <h3 className="mt-2 text-xl font-bold">{title}</h3>
    <p className="mt-2 text-gray-600 dark:text-gray-400">{desc}</p>
  </div>
);

const UseCase = ({ title, desc }) => (
  <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow">
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="mt-2 text-gray-600 dark:text-gray-400">{desc}</p>
  </div>
);

export default Home;

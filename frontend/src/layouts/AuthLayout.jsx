export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen bg-[#F7F3EE] overflow-hidden">

      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* LEFT SIDE */}
        <section className="relative hidden lg:flex overflow-hidden">

          {/* Japanese Pattern */}
          <div
            className="
            absolute
            inset-0
            opacity-20
            bg-[radial-gradient(circle_at_100%_150%,#d6d3d1_24%,transparent_25%),radial-gradient(circle_at_0_150%,#d6d3d1_24%,transparent_25%)]
            bg-[length:80px_80px]
            "
          />

          {/* Red Sun */}
          <div
            className="
            absolute
            w-[650px]
            h-[650px]
            rounded-full
            bg-[#C8102E]
            -right-[280px]
            top-1/2
            -translate-y-1/2
            "
          />

          <div className="relative z-10 flex flex-col justify-between w-full p-20">

            <div>
              <p
                className="
                text-[#C8102E]
                tracking-[14px]
                text-sm
                mb-10
                "
              >
                SECURE • AUTH
              </p>

              <h1
                className="
                text-[8rem]
                font-black
                leading-[0.9]
                text-[#111827]
                "
              >
                SECURE
              </h1>

              <h1
                className="
                text-[8rem]
                font-black
                leading-[0.9]
                text-[#C8102E]
                "
              >
                AUTH
              </h1>

              <p
                className="
                mt-10
                text-gray-600
                text-lg
                max-w-sm
                "
              >
                Authentication inspired by
                simplicity, security and
                Japanese editorial design.
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-6">
                Designed by Bharat
              </p>

              <div className="flex gap-4 items-center">
                <span className="text-red-700 text-2xl">
                  認証
                </span>

                <span className="text-gray-600">
                  安全・認証・信頼
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center px-8 py-12">

          <div className="w-full max-w-md">

            {/* Mobile Branding */}
            <div className="lg:hidden mb-12 text-center">

              <p
                className="
                text-[#C8102E]
                tracking-[10px]
                text-xs
                mb-4
                "
              >
                SECURE • AUTH
              </p>

              <h1 className="text-5xl font-black text-[#111827]">
                SECURE
              </h1>

              <h1 className="text-5xl font-black text-[#C8102E]">
                AUTH
              </h1>
            </div>

            <p
              className="
              text-[#C8102E]
              uppercase
              tracking-[8px]
              text-xs
              mb-3
              "
            >
              Authentication
            </p>

            <h2
              className="
              text-5xl
              font-black
              text-[#111827]
              mb-3
              "
            >
              {title}
            </h2>

            <p className="text-gray-500 mb-10">
              {subtitle}
            </p>

            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
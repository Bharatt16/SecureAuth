import hero from "../assets/hero.png";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen bg-[#F7F3EE]">

     <div
  className="
  min-h-screen
  lg:grid
  lg:grid-cols-[60%_40%]
  "
>

        {/* LEFT SIDE DESKTOP */}
        <section className="relative hidden lg:flex overflow-hidden">

        <img
  src={hero}
  alt="Hero"
  className="
  absolute
  inset-0
  w-full
  h-full
  object-cover
  object-[65%_center]
  "
/>

          <div
            className="
            absolute
            inset-0
            bg-gradient-to-r
            from-white/5
            to-transparent
            "
          />

          <div
            className="
            relative
            z-20
            flex
            flex-col
            justify-between
            w-full
           pl-10
pr-12
py-16     
            "
          >
            <div>

              <p
                className="
                text-[#C8102E]
                tracking-[12px]
                text-xs
                font-medium
                mb-10
                "
              >
                SECURE • AUTH
              </p>

              <h1
                className="
                text-[7rem]
                font-black
                leading-[0.85]
                tracking-tight
                text-[#111827]
                "
              >
                SECURE
              </h1>

              <h1
                className="
                text-[5rem]
                font-black
                leading-[0.85]
                tracking-tight
                text-[#C8102E]
                "
              >
                AUTH
              </h1>

              <p
                className="
                mt-8
                text-gray-950
                max-w-sm
                text-lg
                "
              >
                Authentication inspired by
                simplicity, security and
                Japanese editorial design.
              </p>
            </div>

            <div>

              <p className=" text-gray-950 mb-5">
                Designed by Bharat
              </p>

              {/* <div className="flex items-center gap-3">
                <span className="text-red-700 text-xl">
                  認証
                </span>

                <span className="text-gray-600">
                  安全・認証・信頼
                </span>
              </div> */}

            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section
          className="
          flex
          items-center
          justify-center
          px-6
          py-10
          lg:px-12
          "
        >
          <div
            className="
            w-full
            max-w-md
            "
          >

            {/* MOBILE HERO */}
            <div
              className="
              lg:hidden
              relative
              h-[280px]
              rounded-3xl
              overflow-hidden
              mb-10
              "
            >
              <img
                src={hero}
                alt="Hero"
                className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                object-center
                "
              />

              <div
                className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#F7F3EE]
                via-transparent
                to-transparent
                "
              />

              <div
                className="
                absolute
                bottom-5
                left-5
                "
              >
                <p
                  className="
                  text-[#C8102E]
                  text-xs
                  tracking-[8px]
                  "
                >
                  SECURE • AUTH
                </p>
              </div>
            </div>

            <p
              className="
              uppercase
              text-[#C8102E]
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

            <p
              className="
              text-gray-500
              mb-10
              "
            >
              {subtitle}
            </p>

            {children}

          </div>
        </section>

      </div>

    </div>
  );
}
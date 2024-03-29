import { FaEnvelope, FaLocationArrow, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(38deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0) 100%), url('https://wallpapers.com/images/hd/business-background-vkyltmd1r47q5c2z.jpg')`,
        }}
        className="w-full bg-center bg-cover h-64 flex justify-center items-center pt-[64px]" // Adjust the height as needed
      >
        <h3 className="text-white text-3xl md:text-5xl font-bold">
          Contact US
        </h3>
      </div>
      <div className="max-w-screen-xl mx-auto px-5 py-10 ">
        <div className="md:flex justify-between gap-20">
          <div className="flex md:w-1/3 flex-col gap-5 pb-5 md:pb0">
            <div className="flex items-center gap-2">
              <div className="w-20 h-20 flex items-center justify-center bg-[#ff5522] rounded-full text-white">
                <FaLocationArrow size={30} />
              </div>
              <div>
                <p className="text-xl font-semibold text-[#6C7171]">Location</p>
                <p className="text-[#6C7171]">1280, Mirpur DOHS, Dhaka</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-20 flex items-center justify-center bg-[#ff5522] rounded-full text-white">
                <FaPhone size={30} />
              </div>
              <div>
                <p className="text-xl font-semibold text-[#6C7171]">Phone</p>
                <p className="text-[#6C7171]">+980175252</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-20 flex items-center justify-center bg-[#ff5522] rounded-full text-white">
                <FaEnvelope size={30} />
              </div>
              <div>
                <p className="text-xl font-semibold text-[#6C7171]">Email</p>
                <p className="text-[#6C7171]">helo@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-[#6C7171] text-3xl font-bold pb-5">
              Send Us A Message
            </h3>
            <div>
              <form className="space-y-6">
                <div className="md:flex gap-10 justify-between">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Your Name"
                    className="border p-2 w-full outline-none mb-5 md:mb-0"
                    required
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    className="border p-2 w-full outline-none"
                    required
                  />
                </div>

                <div className="md:flex gap-10 justify-between">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Your Phone"
                    className="border p-2 w-full outline-none mb-5 md:mb-0"
                    required
                  />

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Subject"
                    className="border p-2 w-full outline-none"
                    required
                  />
                </div>

                <textarea
                  id="message"
                  name="message"
                  className="border p-2 w-full h-32"
                  required
                />

                <button
                  type="submit"
                  className="bg-[#FF5522] w-1/2 text-white p-2 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
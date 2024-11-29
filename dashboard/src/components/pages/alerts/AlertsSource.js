import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";

const AlertsSource = () => {
  const [toggleTab, setToggleTab] = useState(1);

  function handleSubmit() {
    console.log("submit form");
  }

  return (
    <div>
      <div className="flex items-center">
        <div
          className={
            toggleTab === 1
              ? "me-2 w-[30px] h-[30px] border border-current rounded-full flex items-center justify-center"
              : "me-2 w-[30px] h-[30px] bg-blue-500 text-white rounded-full flex items-center justify-center"
          }
        >
          1
        </div>
        {toggleTab === 1 ? (
          <IoIcons.IoIosArrowDown />
        ) : (
          <MdIcons.MdArrowForwardIos />
        )}
        <div className="text-xl ms-2">Alert Details</div>
      </div>
      {toggleTab === 1 ? (
        <div className="border-s-2 ms-[15px] p-3">
          <label>Name</label>
          <div>
            <input
              label="name"
              type="text"
              placeholder="Name"
              className="w-[80%] border px-3 py-1 rounded"
            />
          </div>
          <br></br>
          <label>Alert Type</label>
          <div>
            <select className="w-[80%] border px-3 py-1 rounded h-10">
              <option value="event" className="w-[80%] px-50 py-20 h-10">
                Event
              </option>
              <option value="threshold" className="w-[80%] px-50 py-20 h-10">
                Threshold
              </option>
            </select>
          </div>
          <div className="flex gap-5 pt-3">
            <button
              className="rounded-md bg-blue-500 px-3 py-1 text-white"
              onClick={() => setToggleTab(2)}
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="border-s-2 ms-[15px] p-5"></div>
      )}
      <div className="flex items-center">
        <div
          className={
            toggleTab === 2
              ? "me-2 w-[30px] h-[30px] border border-current rounded-full flex items-center justify-center"
              : "me-2 w-[30px] h-[30px] bg-blue-500 text-white rounded-full flex items-center justify-center"
          }
        >
          2
        </div>
        {toggleTab === 2 ? (
          <IoIcons.IoIosArrowDown />
        ) : (
          <MdIcons.MdArrowForwardIos />
        )}
        <div className="text-xl ms-2">Define Matric</div>
      </div>
      {toggleTab === 2 ? (
        <div className="border-s-2 ms-[15px] p-3">
          <label>Metric</label>
          <div>
            <select className="w-[80%] border px-3 py-1 rounded h-10">
              <option value="event" className="w-[80%] px-50 py-20 h-10">
                Event
              </option>
              <option value="threshold" className="w-[80%] px-50 py-20 h-10">
                Threshold
              </option>
            </select>
          </div>
          <br></br>
          <label>Filter</label>
          <div>
            <select className="w-[80%] border px-3 py-1 rounded h-10">
              <option value="event" className="w-[80%] px-50 py-20 h-10">
                Event
              </option>
              <option value="threshold" className="w-[80%] px-50 py-20 h-10">
                Threshold
              </option>
            </select>
          </div>
          <div className="flex gap-5 pt-3">
            <button
              className="rounded-md bg-blue-500 px-3 py-1 text-white"
              onClick={() => setToggleTab(3)}
            >
              Continue
            </button>
            <button
              className="rounded-md border-2 px-3 py-1"
              onClick={() => setToggleTab(1)}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="border-s-2 ms-[15px] p-5"></div>
      )}
      <div className="flex items-center">
        <div
          className={
            toggleTab === 3
              ? "me-2 w-[30px] h-[30px] border border-current rounded-full flex items-center justify-center"
              : "me-2 w-[30px] h-[30px] bg-blue-500 text-white rounded-full flex items-center justify-center"
          }
        >
          3
        </div>
        {toggleTab === 3 ? (
          <IoIcons.IoIosArrowDown />
        ) : (
          <MdIcons.MdArrowForwardIos />
        )}
        <div className="text-xl ms-2">Notify your Team</div>
      </div>
      {toggleTab === 3 ? (
        <div className="border-s-2 ms-[15px] p-3">
          <label>Email</label>
          <div>
            <select className="w-[80%] border px-3 py-1 rounded h-10">
              <option value="event" className="w-[80%] px-50 py-20 h-10">
                Event
              </option>
              <option value="threshold" className="w-[80%] px-50 py-20 h-10">
                Threshold
              </option>
            </select>
          </div>
          <br></br>
          <label>Recipient</label>
          <div>
            <select className="w-[80%] border px-3 py-1 rounded h-10">
              <option value="event" className="w-[80%] px-50 py-20 h-10">
                Event
              </option>
              <option value="threshold" className="w-[80%] px-50 py-20 h-10">
                Threshold
              </option>
            </select>
          </div>
          <label>Message</label>
          <div>
            <textarea
              rows={3}
              className="w-[80%] border-2 px-3 py-1 rounded h-20"
              placeholder="Message"
            ></textarea>
          </div>
          <div className="flex gap-5 pt-3">
            <button
              className="rounded-md bg-blue-500 px-3 py-1 text-white"
              onClick={() => handleSubmit()}
            >
              Continue
            </button>
            <button
              className="rounded-md border-2 px-3 py-1"
              onClick={() => setToggleTab(2)}
            >
              Back
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AlertsSource;

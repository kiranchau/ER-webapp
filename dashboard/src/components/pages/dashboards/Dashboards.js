import React, { useEffect, useState, useMemo } from "react";
import home1 from "../../../media/home1.png";
import dashboard from "../../../media/dashboard.png";
import home2 from "../../../media/home2.png";
import home3 from "../../../media/home3.png";
import home4 from "../../../media/home4.png";
import Modal from "../../UI/Modal";
import AddDashboard from "./AddDashboard";
import { useHistory } from "react-router-dom";
import Button from "../../UI/Button";
import * as FaIcons from "react-icons/fa";
import { allMatricsDashboard, tokenUpdate } from "../../../API/authCrud";
import UseSharedDataContext from "../../context/UseSharedDataContext";
import Spinner from "../../UI/Spinner";

const Dashboards = () => {
  const SharedDataContext = UseSharedDataContext();
  const history = useHistory();
  const [isAddDashboardModalOpen, setIsAddDashboardModalOpen] = useState(false);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    SharedDataContext.setSpinnerLoad(true);
    allMatricsDashboard()
      .then((res) => {
        console.log("getAllMatricsDashboard 12", res);
        if (res.status === 200) {
          setCardsData(res.data);
          SharedDataContext.setSpinnerLoad(false);
        }
      })
      .catch((err) => {
        console.log("getAllMatricsDashboard 123", err);
        const refreshToken = localStorage.getItem("refreshtoken");
        if (refreshToken) {
          const refreshTokenObj = { refresh: refreshToken.replace(/['"]+/g, "") };
          tokenUpdate(refreshTokenObj)
            .then((res) => {
              console.log("res..tokenUpdate", res);
              if (res.status === 200) {
                localStorage.setItem("token", JSON.stringify(res.data.access));
                // Refresh the page
                window.location.reload();
              } else {
                throw new Error("Token update failed");
              }
            })
            .catch((err) => {
              console.log("Token update error:", err);
              localStorage.clear();
              history.push("/");
            });
        }
        SharedDataContext.setSpinnerLoad(false);
      });
  }, [isAddDashboardModalOpen]);

  // Unique key to force remount when isAddDashboardModalOpen becomes false
  const remountKey = useMemo(() => Date.now(), [isAddDashboardModalOpen]);

  return (
    <div key={remountKey} className="PageContent mx-auto p-4">
      {" "}
      {/* Use remountKey as a key prop */}
      <Modal
        isOpen={isAddDashboardModalOpen}
        onClose={() => setIsAddDashboardModalOpen(false)}
      >
        <AddDashboard setIsAddDashboardModalOpen={setIsAddDashboardModalOpen} />
      </Modal>
      <header className="flex justify-between items-center mb-4">
        <h1 className="PageTitle">Dashboards</h1>
        <Button onClick={() => setIsAddDashboardModalOpen(true)}>
          <FaIcons.FaPlus />
          Add Dashboard
        </Button>
      </header>
      <div>
        {SharedDataContext.spinnerLoad === true ? (
          <Spinner />
        ) : (
          <div className="adHgt overflow-y-auto">
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"> */}
            <div className="flex flex-wrap gap-4">
              {cardsData.map((card, index) => (
                <div
                  key={index}
                  onClick={() => history.push("/dashboard/details/" + card.id)}
                  className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer border-[1px] border-neutral-300"
                >
                  <img
                    src={dashboard}
                    alt={card.name}
                    className="w-[280px] h-[200px] object-contain"
                  />
                  <div className="p-4">
                    <h2 className="text-xl mb-2">{card.name}</h2>
                    <p className="flex items-center">
                      <div className="w-5 h-5 bg-gray-400 text-xs text-white rounded-full flex items-center justify-center">
                        D
                      </div>
                      <div className="ml-2 mt-[1px] text-xs">
                        {card.description}
                      </div>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboards;

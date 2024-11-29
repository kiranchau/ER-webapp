import React, { useEffect, useState } from "react";
import MatricCard from "../../UI/MatricCard";
import Button from "../../UI/Button";
import MatricView from "../../popups/MatricView";
import AddMetrics from "./dashboardviews/AddMetrics";
import Modal from "../../UI/Modal";
import { useHistory } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import * as SlIcons from "react-icons/sl";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  GetDashboardMetrics,
  GetMetricDetails,
  GetMetricsList,
  GetQueryResult,
  deleteMatricsDashboard,
  editMatricsDashboard,
  specificMatricsDashboard,
} from "../../../API/authCrud";
import Input from "../../UI/Input";
import MenuBtn from "../../UI/MenuBtn";
import UseSharedDataContext from "../../context/UseSharedDataContext";
import RenderContent from "./RenderContent";
import Spinner from "../../UI/Spinner";
import { MetricDetailsProvider } from "../../context/MetricDetailsContext";
import UseMetricDetailsContext from "../../context/UseMetricDetailsContext";

const DashboardView = () => {
  const { id } = useParams();
  const [popUps, setPopUps] = useState(false);
  const [isAddMetricsModalOpen, setIsAddMetricsModalOpen] = useState(false);
  const history = useHistory();
  const [selectedDashboard, setSelectedDashboard] = useState({});
  const [cardName, setCardName] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardPrivacy, setCardPrivacy] = useState("");
  const [optnShow, setOptnShow] = useState(false);
  const [dashboardMetricsList, setDashboardMetricsList] = useState([]);
  const sharedDataContext = UseSharedDataContext();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [metricsDetails, setMetricsDetails] = useState([]);
  const metricDetailsContext = UseMetricDetailsContext();

  const OptnState = () => {
    setOptnShow(!optnShow);
  };
  useEffect(() => {
    sharedDataContext.setSpinnerLoad(true);
    const fetchData = async () => {
      try {
        // Fetch dashboard metrics based on the id
        const dashboardMetricsResponse = await GetDashboardMetrics();
        const filteredMetrics = dashboardMetricsResponse.data.filter(
          (item) => item.dashboard_id === parseInt(id)
        );

        // Extract metric_ids
        const metricIds = filteredMetrics.map((metric) => metric.metric_id);

        // Fetch metrics list
        const metricsListResponse = await GetMetricsList();
        const metricsListArray = metricsListResponse.data;

        // Filter details based on metric_ids
        const details = metricsListArray.filter((item) =>
          metricIds.includes(item.id)
        );

        // Fetch metric details
        const metricDetailsResponse = await GetMetricDetails();
        const metricDetails = metricDetailsResponse.data;

        // Add visualization_id to the metrics
        const metricsWithVisualizationId = details.map((metric) => {
          const matchedMetric = metricDetails.find(
            (detail) => detail.metric_id === metric.id
          );
          return matchedMetric
            ? { ...metric, visualization_id: matchedMetric.visualization_id }
            : metric;
        });
        setDashboardMetricsList(metricsWithVisualizationId);
        sharedDataContext.setSpinnerLoad(false);
      } catch (error) {
        sharedDataContext.setSpinnerLoad(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    sharedDataContext.setMeasure([]);
    sharedDataContext.setDimension([]);
    specificMatricsDashboard(id)
      .then((res) => {
        if (res.status === 200) {
          setSelectedDashboard(res.data);
          setCardName(res.data.name);
          setCardDescription(res.data.description);
          setCardPrivacy(res.data.privacy);
        }
      })
      .catch((err) => { });
  }, []);

  const onHandleChange = (value, e) => {
    if (value === "name") {
      setCardName(e.target.value);
    } else {
      setCardDescription(e.target.value);
    }
    updateMatricsDashboard();
  };

  const updateMatricsDashboard = () => {
    const data = {
      name: cardName,
      description: cardDescription,
      privacy: cardPrivacy,
    };
    editMatricsDashboard(id, data);
  };

  const removeMatricsDashboard = () => {
    deleteMatricsDashboard(id)
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          history.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="PageContent overflow-auto">
      <Modal
        isOpen={isAddMetricsModalOpen}
        onClose={() => setIsAddMetricsModalOpen(false)}
      >
        <AddMetrics dashboard={selectedDashboard} />
      </Modal>
      {/* {cardsData.map((card) => ( */}
      <div className="pt-3 flex justify-between items-center  scrollView">
        <div style={{ width: "80%" }}>
          <div
            onClick={() => history.push("/dashboard")}
            className="flex items-center mb-2"
          >
            <span className="text-indigo-600 cursor-pointer">Dashboards</span>
            <IoIosArrowForward className="text-gray-500" />
          </div>
          <div className="w-full">
            <input
              value={cardName}
              onChange={(e) => {
                onHandleChange("name", e);
              }}
              maxLength={100}
              className="PageTitle w-full pl-2 py-1"
            />
            <input
              value={cardDescription}
              onChange={(e) => {
                onHandleChange("desc", e);
              }}
              maxLength={250}
              className="text-sm text-gray-400 mt-2 w-full pl-2 py-1"
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button onClick={() => setIsAddMetricsModalOpen(true)}>
            <FaIcons.FaPlus />
            Add Metrics
          </Button>
          <div className="px-3 relative">
            <div onClick={() => OptnState()}>
              <SlIcons.SlOptionsVertical />
            </div>
            {optnShow && (
              <div className="absolute z-20 right-5 p-1 bg-white rounded shadow-lg">
                <MenuBtn>
                  <HiIcons.HiOutlineDuplicate />
                  Duplicate
                </MenuBtn>
                <MenuBtn onClick={removeMatricsDashboard}>
                  <RiIcons.RiDeleteBin6Line />
                  Delete
                </MenuBtn>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ))} */}

      <div className="pt-3 sticky -top-[10px] bg-white z-10">
        <div className="flex justify-between border-t">
          <div className="flex allfil mb-4">
            <button className="filterBtn px-4 py-1">Last Quarter</button>
            <button className="filterBtn px-4 py-1">Last 12 Months</button>
            <button className="filterBtn px-4 py-1">MTD</button>
            <button className="filterBtn px-4 py-1">QTD</button>
            <button className="filterBtn px-4 py-1">YTD</button>
            <button className="filterBtn px-4 py-1">1 Year</button>
            {/* <button className='filterBtn px-4 py-1'>Filter7</button> */}
          </div>
          <div>
            <button className="filSave">SAVE</button>
          </div>
        </div>
        {sharedDataContext.spinnerLoad === true ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap gap-5 pb-10 mb-10">
            {dashboardMetricsList.length > 0 &&
              dashboardMetricsList.map((metric, index) => (
                <MetricDetailsProvider>
                <MatricCard
                  className="w-[32%] h-auto"
                  title={metric.name}
                  // handleMetricClick={handleMetricClick}
                  metric={metric}
                  selectedDashboard={selectedDashboard}
                  id={id}
                >
                  <RenderContent
                    metric={metric}
                    metricsDetails={metricsDetails}
                    setMetricsDetails={setMetricsDetails}
                  />
                </MatricCard>
                </MetricDetailsProvider>
              ))}
          </div>
        )}
      </div>
      <div className={`${popUps ? "centerpopups" : "nocenterpopups"}`}>
        {popUps ? <MatricView /> : ""}
        <div className="blurBg"></div>
      </div>
    </div>
  );
};

export default DashboardView;

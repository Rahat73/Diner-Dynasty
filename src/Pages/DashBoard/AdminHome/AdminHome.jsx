import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaShoppingBag, FaUsers, FaWallet } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { dashboardVariants } from "../DashboardVariants/DashboardVariants";

////////////////////////////////Recharts//////////////////////////////////
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
    Z`;
};
const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
////////////////////////////////Recharts//////////////////////////////////

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/order-stats");
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Diner Dynasty | Admin Home</title>
      </Helmet>
      <motion.div
        variants={dashboardVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <SectionHeader
          heading={"Admin Home"}
          subHeading={"Welcome to"}
        ></SectionHeader>

        <div className="bg-base-200 p-10 w-11/12 lg:max-h-[34rem] overflow-auto mx-auto my-4 border border-current">
          <h1 className="text-2xl">
            Hi,{" "}
            <span className=" font-bold text-amber-500">
              {user.displayName}
            </span>
          </h1>
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full mx-auto my-5">
            <div className="stat flex justify-between lg:justify-evenly items-center">
              <BiSolidDish className="text-6xl" />
              <div>
                <div className="stat-title">Menus</div>
                <div className="stat-value">{stats.menus}</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
              </div>
            </div>

            <div className="stat flex justify-between lg:justify-evenly items-center">
              <FaUsers className="text-5xl" />
              <div>
                <div className="stat-title">Customers</div>
                <div className="stat-value">{stats.users}</div>
                <div className="stat-desc">↗︎ 1 (22%)</div>
              </div>
            </div>

            <div className="stat flex justify-between lg:justify-evenly items-center">
              <FaShoppingBag className="text-5xl" />
              <div>
                <div className="stat-title">Orders</div>
                <div className="stat-value">{stats.orders}</div>
                <div className="stat-desc">↗︎ 2 (14%)</div>
              </div>
            </div>

            <div className="stat flex justify-between lg:justify-evenly items-center">
              <FaWallet className="text-5xl" />
              <div>
                <div className="stat-title">Revenue</div>
                <div className="stat-value">
                  {parseFloat(stats.revenue).toFixed(2)}
                </div>
                <div className="stat-desc">↗︎ 20 (15%)</div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Bar
                    dataKey="total"
                    fill="#8884d8"
                    shape={<TriangleBar />}
                    label={{ position: "top" }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <h1 className="text-center">Category vs Revnue</h1>
            </div>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Legend></Legend>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="itemCount"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        name={entry.category}
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <h1 className="text-center">Category vs Orders</h1>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminHome;

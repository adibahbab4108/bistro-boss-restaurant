import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCartArrowDown, FaDollarSign, FaUser } from "react-icons/fa";
import { SiFoodpanda } from "react-icons/si";

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, ResponsiveContainer, Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const RADIAN = Math.PI / 180;

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Query for stats
    const { data: stats = { revenue: 0, users: 0, orders: 0, menuItems: 0 }, isLoading, isError, error } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const response = await axiosSecure.get("/admin-stats");
            return response.data;
        },
        enabled: !!user, // Fetch only if user exists
        staleTime: 0, // Always fetch fresh data
    });

    // Query for chart data
    const { data: chartData = [] } = useQuery({
        queryKey: ["order-stats"],
        queryFn: async () => {
            const response = await axiosSecure.get("/order-stats");
            return response.data;
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message || "An unknown error occurred"}</p>;

    // Map chart data for the PieChart
    const pieChartData = chartData.map((data) => ({
        name: data.category,
        value: data.revenue,
    }));

    // Custom label for the PieChart
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Custom shape for the BarChart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
        <div>
            <h2 className="text-3xl">Hi, Welcome {user?.displayName || "back"}</h2>
            <div>
                {/* Stats Section */}
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaDollarSign className="text-2xl" />
                        </div>
                        <div className="stat-title">Revenue</div>
                        <div className="stat-value">${stats.revenue}</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUser className="text-2xl" />
                        </div>
                        <div className="stat-title">Users</div>
                        <div className="stat-value">{stats.users}</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaCartArrowDown className="text-2xl" />
                        </div>
                        <div className="stat-title">Orders</div>
                        <div className="stat-value">{stats.orders}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <SiFoodpanda className="text-2xl" />
                        </div>
                        <div className="stat-title">Menu Items</div>
                        <div className="stat-value">{stats.menuItems}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="flex md:flex-col flex-row lg:flex-row">
                    <div className="w-1/2 border">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: "top" }}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-1/2">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;

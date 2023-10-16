import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import usePayment from "../../../hooks/usePayment";

const PaymentHistory = () => {
  const [payments] = usePayment();
  return (
    <>
      <Helmet>
        <title>Diner Dynasty | My Bookings</title>
      </Helmet>
      <SectionHeader
        heading={"Payment History"}
        subHeading={"Keep Track of Your"}
      ></SectionHeader>
      <div className="bg-base-200 p-10 w-11/12 lg:max-h-[30rem] overflow-auto mx-auto border border-current">
        <h1 className="text-2xl font-semibold text-center">
          Total Payments: {payments.length}
        </h1>
        <div className="overflow-x-auto my-10">
          {payments.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Transaction ID</th>
                  <th>Paid</th>
                  <th>Items Bought</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.date}</td>
                    <td>{item.transactionId}</td>
                    <td>$ {item.price}</td>
                    <td>
                      {item.itemNames?.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-4xl text-center my-20">
              No payments to show
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;

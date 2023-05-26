import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBills } from "../../../Actions/admin.js"
import { useLocation } from 'react-router-dom';
import { deleteBill } from '../../../Actions/admin.js';

function Bills({ theme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBills());
  }, [location, dispatch])

  const [delete_Bill_Id, setDelete_Bill_Id] = useState(0);

  const getBillId = (e) => {
    setDelete_Bill_Id(e.target.value);
  }

  const bills = useSelector((data) => data.bills);

  const navigateToBill = (bill) => {
    navigate('/bill', { state: { bill: bill } });
  }

  return (
    <div>
      <h2 className='m-3'>Bills</h2>
      {(bills.length !== 0) && (
        <div>
          <table className={`table table-${theme.color} table-hover`}>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Cashier Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Purchased At</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>

              {bills.map((bill, i) => {
                return (<tr role="button">
                  <th scope="row" onClick={() => navigateToBill(bill)}>{i + 1}</th>
                  <td onClick={() => navigateToBill(bill)}>{bill.customer_name}</td>
                  <td onClick={() => navigateToBill(bill)}>{bill.cashier_name}</td>
                  <td onClick={() => navigateToBill(bill)}>{bill.amount}</td>
                  <td onClick={() => navigateToBill(bill)}>{new Date(bill.purchasedAt).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-danger w-100" name="delete-btn" value={bill._id} onClick={getBillId} data-bs-target="#deleteBillModal" data-bs-toggle="modal">DELETE</button></td>
                </tr>)
              })}
            </tbody>
          </table>

          <div className="modal fade" id="deleteBillModal" tabindex="-1" aria-labelledby="deleteBillModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className={`modal-content bg-${theme.color}`}>
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteBillModalLabel">Delete Bill</h5>
                  <button type="button" className={`btn-close bg-${theme.color === 'light' ? 'dark' : 'light'}`} data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="modal-body">
                    <h5>Are you sure you want to Delete the Bill?</h5>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className={`btn btn-${theme.color === 'light' ? 'dark' : 'light'} px-4`} onClick={() => { dispatch(deleteBill(delete_Bill_Id)); navigate("/bills") }} data-bs-dismiss="modal">YES</button>
                  <button type="button" className={`btn btn-${theme.color === 'light' ? 'dark' : 'light'} px-4`} data-bs-dismiss="modal">NO</button>
                </div>
              </div>
            </div>
          </div>
        </div>)
      }

      {
        (bills.length === 0) && (
          <div className="d-flex align-items-center justify-content-center" style={{ height: "50vh" }}>
            <h2>Bills Don't Exist</h2>
          </div>
        )
      }
    </div >
  )
}

export default Bills
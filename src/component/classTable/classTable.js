import React, { useEffect, useState } from "react";
import db from "./../connectFirebase/firebase";
import Navbar from "./../navbar/Navbar";
import Sidebar from "./../sidebar/sidebar";
import "./../classTable/classTable.css";

var k = 0;

export default function ClassTable({ match }) {
  // console.log(match);
  const [spinner, setSpinner] = useState(false);

  const [table, setTable] = useState([]);
  useEffect(async () => {
    setSpinner(true);
    return await db
      .collection("Tables")
      .where("teacher_id", "==", localStorage.getItem("ID"))
      .where("class_id", "==", match.params.id)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((data) => {
          setTable(snapshot.docs.map((doc) => doc.data()));
        });
        setSpinner(false);
      });
  }, []);

  return (
    <>
      {console.log(table[0])}
      {spinner && (
        <div className="_width-prop">
          <div className="loader"></div>
        </div>
      )}
      <Navbar />
      <Sidebar />
      <div className="xsom1"></div>
      <div className="hero__subject1">
        <table id="customers">
          <tr>
            <th className="th__stylesheet">ორშაბათი</th>
            <th className="th__stylesheet">სამშაბათი</th>
            <th className="th__stylesheet">ოთხშაბათი</th>
            <th className="th__stylesheet">ხუთშაბათი</th>
            <th className="th__stylesheet">პარასკევი</th>
          </tr>
          <tr>
            {table.map((item) => {
              return (
                <>
                  <td>
                    {item.monday.map((dat, i) => {
                      {
                        k = i + 1;
                      }
                      return (
                        <>
                          <div className="border__bottom__stylesheet">
                            {k}&nbsp; - &nbsp;
                            {!dat || dat == null ? "თავისუფალია" : dat}
                            <br />
                          </div>
                        </>
                      );
                    })}
                  </td>
                  <td>
                    {item.tuesday.map((data, i) => {
                      {
                        k = i + 1;
                      }
                      return (
                        <>
                          <div className="border__bottom__stylesheet">
                            {k}&nbsp; - &nbsp;{data}
                            <br />
                          </div>
                        </>
                      );
                    })}
                  </td>
                  <td>
                    {item.wednesday.map((data, i) => {
                      {
                        k = i + 1;
                      }
                      return (
                        <>
                          <div className="border__bottom__stylesheet">
                            {k}&nbsp; - &nbsp;{data}
                            {!data || data == null ? "თავისუფალია" : data}
                            <br />
                          </div>
                        </>
                      );
                    })}
                  </td>
                </>
              );
            })}
          </tr>
        </table>
      </div>
    </>
  );
}

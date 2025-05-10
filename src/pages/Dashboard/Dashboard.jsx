import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import AddUserModal from "../../components/AddUserModal/AddUserModal";
import DeleteModal from "../../components/DeleteModal";
import "./dashboard.css";
import HigherOrderAuthentication from "../../components/HigherOrderAuthentication";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState([]);
  const [searchingList, setSearchingList] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [timerId, setTimerId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    setIsLoading(true);
    const value = e?.target.value;
    setSearchVal(value);
    clearTimeout(timerId);
    const newTImerId = setTimeout(() => {
      const newList = value?.trim()
        ? searchingList?.filter(
            (o) =>
              o?.name?.toLowerCase().includes(value?.toLowerCase()) ||
              o?.email?.toLowerCase().includes(value?.toLowerCase())
          )
        : searchingList;
      setList(newList);
    }, 800);
    setTimerId(newTImerId);
    setIsLoading(false);
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      setList(users);
      setSearchingList(users);
    }
  }, []);
  return (
    <>
      <DeleteModal
        isOpen={isDelete}
        setIsOpen={setIsDelete}
        title={"Delete User"}
        setList={setList}
      />
      <AddUserModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={isEdit ? "Edit user" : "Add user"}
        setList={setList}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <div className="dashboard-container">
        <div className="dashboard-action">
          <div className="search-container">
            <input
              type="search"
              className="search"
              placeholder="Search with name..."
              value={searchVal}
              onChange={handleSearch}
            />
            <i className="bi bi-search search-icon" />
          </div>
          <Button text="Add" onClick={() => setIsOpen(true)} />
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="no-data-found">
                <td className="text-center" colSpan={"4"}>
                  No Data Found
                </td>
              </tr>
            ) : list?.length === 0 ? (
              <tr className="no-data-found">
                <td className="text-center" colSpan={"4"}>
                  No Data Found
                </td>
              </tr>
            ) : (
              list?.map((o, index) => {
                return (
                  <tr key={index}>
                    <td>{o?.name}</td>
                    <td>{o?.email}</td>
                    <td>{o?.role}</td>
                    <td>
                      <div className="action-button">
                        <Button
                          text="Update"
                          onClick={() => {
                            setIsOpen(true);
                            setIsEdit(o);
                          }}
                        />
                        <Button text="Delete" onClick={() => setIsDelete(o)} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HigherOrderAuthentication(Dashboard);

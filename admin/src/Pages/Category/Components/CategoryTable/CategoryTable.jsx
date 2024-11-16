// CategoryTable.js
import React from 'react';
import { Button } from '@mui/material';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const CategoryTable = ({ catData, editCat, handleOpenDeleteDialog }) => {
  return (
    <table className="table table-bordered v-align">
      <thead className="thead-dark">
        <tr>
          <th>UID</th>
          <th>IMAGE</th>
          <th>NAME CATEGORY</th>
          <th>COLOR</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {catData?.categoryList?.map((item, index) => (
          <tr key={item._id}>
            <td>#{index + 1}</td>
            <td>
              <div className="d-flex align-items-center productBox">
                <div className="imgWrapper">
                  <div className="img">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
            </td>
            <td>{item.name}</td>
            <td style={{ textAlign: 'center' }}>
              <div
                className="text-center"
                style={{
                  backgroundColor: item.color,
                  height: '50px',
                  lineHeight: '50px',
                }}
              >
                {item.color}
              </div>
            </td>
            <td>
              <div className="actions d-flex align-items-center">
                <Button
                  className="success"
                  color="success"
                  onClick={() => editCat(item._id)}
                >
                  <FaPencilAlt />
                </Button>
                <Button
                  className="error"
                  color="error"
                  onClick={() => handleOpenDeleteDialog(item._id)}
                >
                  <MdDelete />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;

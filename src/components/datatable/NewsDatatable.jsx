import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import swal2 from "sweetalert2";
import { useDataContext } from "../../context/DataProvider";

const NewsDatatable = ({ rows, title, newColumns }) => {
  const navigate = useNavigate();
  const { deleteNews } = useDataContext();

  const actionColumn = [
    {
      field: "handle",
      renderHeader: () => <strong>Hành động</strong>,
      headerAlign: "center",
      sortable: false,

      flex: 0.5,
      align: "center",
      renderCell: (params) => {
        {
          return (
            <div className="cellAction">
              <Link
                to={`/news/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <button className="viewButton">Xem</button>
              </Link>
              {params.row.status != 2 && (
                <div
                  className="deleteButton"
                  onClick={() => {
                    swal2
                      .fire({
                        title: "Bạn có muốn xóa bài viết này?",
                        showDenyButton: true,
                        confirmButtonText: "Có",
                        denyButtonText: "Không",
                      })
                      .then((result) => {
                        if (result.isConfirmed) {
                          deleteNews(params.row.id);
                        }
                      });
                  }}
                >
                  Xóa
                </div>
              )}
            </div>
          );
        }
      },
    },
  ];

  return (
    <div className="datatable overflow-hidden h-[950px]">
      <div className="flex justify-between mb-3">
        <div className="font-semibold text-[24px]">Quản lý {title}</div>
        <div
          onClick={() => {
            navigate("/news/new");
          }}
          className="bg-teal-500 text-white w-[200px] rounded-md p-2 flex justify-center items-center cursor-pointer hover:bg-teal-600 transition-all duration-200"
        >
          Thêm mới
        </div>
      </div>

      <DataGrid
        className="datagrid"
        rows={rows}
        columns={newColumns.concat(actionColumn)}
        hideFooter={true}
        rowHeight={200}
        sx={{
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "&.MuiDataGrid-root": {
            border: "none",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
            {
              outline: "none",
            },
          "& .MuiDataGrid-columnHeaders": {},
        }}
      />
    </div>
  );
};

export default NewsDatatable;

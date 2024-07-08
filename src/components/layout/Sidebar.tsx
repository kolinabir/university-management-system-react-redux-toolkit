import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { sideBarItemsGenerator } from "../../utils/sideBarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPath } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const role = "student";

  let sideBarItems;

  switch (role) {
    case userRole.ADMIN: 
      sideBarItems = sideBarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sideBarItems = sideBarItemsGenerator(facultyPath, userRole.FACULTY);
      break;
    default:
      sideBarItems = sideBarItemsGenerator(studentPaths, userRole.STUDENT);
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          width: "100%",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20 px",
        }}
        className=""
      >
        Uni Management
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sideBarItems}
      />
    </Sider>
  );
};

export default Sidebar;

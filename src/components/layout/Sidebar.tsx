import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPath } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { sidebarItemsGenerator } from "../../utils/sideBarItemsGenerator";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  let sideBarItems;

  switch (user!.role) {
    case userRole.ADMIN:
      sideBarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sideBarItems = sidebarItemsGenerator(facultyPath, userRole.FACULTY);
      break;
    default:
      sideBarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
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

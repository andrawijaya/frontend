import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./auth/signIn/SignIn";
import MainMenu from "./mainMenu/MainMenu";
import NotFoundPage from "./parts/notFoundPage/NotFoundPage";
import Cookie from "js-cookie";
import SideBar from "./parts/navBar/SideBar";
import RoutesCMS from "./cms/routes/RoutesCMS";
import { isEmpty } from "lodash";
import "./App.css";

const token = Cookie.get("xdFwDX");
const jobPortal = Cookie.get("pQesRTM0");
const cms = Cookie.get("cKnLtPqq");
const employee = Cookie.get("nQjoQ8niN");
const hr = Cookie.get("jIqd9UoqOW");
const bd = Cookie.get("hI2qdG9qHK");

// admin
const superAdmin = Cookie.get("qPsGdPU4nG");
const adminJobPortal = Cookie.get("pM9biA2Nwa5");
const adminCms = Cookie.get("jWb2nOnqE9");
const adminHr = Cookie.get("nQ9Jnap7Wkn");
const adminBd = Cookie.get("kU4boiBa2ho");

const CustomRouteCms = (props) => {
  if (superAdmin || cms || adminCms) {
    return <Route {...props} />;
  }
  return <Route path="*" component={NotFoundPage} />;
};

// const CustomRouteJobPortal = (props) => {
//   if (superAdmin || jobPortal || adminJobPortal) {
//     return <Route {...props} />;
//   }
//   return <Route path="*" component={NotFoundPage} />;
// };

// const CustomRouteEmployee = (props) => {
//   if (superAdmin || employee) {
//     return <Route {...props} />;
//   }
//   return <Route path="*" component={NotFoundPage} />;
// };

// const CustomRouteHr = (props) => {
//   if (superAdmin || hr || adminHr) {
//     return <Route {...props} />;
//   }
//   return <Route path="*" component={NotFoundPage} />;
// };

// const CustomRouteBd = (props) => {
//   if (superAdmin || bd || adminBd) {
//     return <Route {...props} />;
//   }
//   return <Route path="*" component={NotFoundPage} />;
// };

function App() {
  return (
    <div className="App">
      {isEmpty(token) ? (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={SignIn} />
          </Switch>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <SideBar />
          <Switch>
            <Route path="/" exact component={MainMenu} />
            {/* Website CMS */}
            <CustomRouteCms path="/website-cms" exact component={RoutesCMS} />
            <CustomRouteCms path="/website-cms" exact component={RoutesCMS} />
            <CustomRouteCms
              path="/website-cms/home"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/home/form/:type/:id"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/topics"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/topics/form/:type/:id"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/articles"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/webinars"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/clients"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/clients/form/:type/:id"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/articles/form/:type/:id"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/webinars/form/:type/:id"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/industries"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/industries/form/:type/:id"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/services"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/services/form/:type/:id"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/messages"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/messages/:id"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/alumni"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/alumni/form/:type/:id"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/people"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/people/form/:type/:id"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/subscriptions"
              exact
              component={RoutesCMS}
            />
            <CustomRouteCms
              path="/website-cms/subscriptions/:type/:id"
              exact
              component={RoutesCMS}
            />

            {/* not found page, keep it in bottom routes collection */}
            {isEmpty(token) ? (
              <Route component={SignIn} />
            ) : (
              <Route component={NotFoundPage} />
            )}
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SidebarCMS from "../sideBar/SidebarCMS.js";
import Dashboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home/Home";
import FormHomeSlider from "../pages/home/formHomeSlider/FormHomeSlider";
import Topics from "../pages/insights/topics/Topics";
import Articles from "../pages/insights/articles/Articles";
import Webinars from "../pages/insights/webinars/Webinars";
import FormWebinars from "../pages/insights/webinars/FormWebinars.js";
import FormTopics from "../pages/insights/topics/FormTopics";
import Clients from "../pages/clients/Clients";
import ClientsForm from "../pages/clients/ClientsForm";
import FormArticles from "../pages/insights/articles/FormArticles";
import Industries from "../pages/industries/Industries";
import IndustriesForm from "../pages/industries/IndustriesForm";
import Services from "../pages/services/Services.js";
import ServicesForm from "../pages/services/ServicesForm.js";
import Messages from "../pages/messages/Messages.js";
import MessagesForm from "../pages/messages/MessagesForm.js";
import People from "../pages/aboutUs/people/People.js";
import PeopleForm from "../pages/aboutUs/people/PeopleForm.js";
import Alumni from "../pages/aboutUs/alumni/Alumni.js";
import AlumniForm from "../pages/aboutUs/alumni/AlumniForm.js";
import Subscriptions from "../pages/subscriptions/Subscriptions.js";
import SubscriptionsForm from "../pages/subscriptions/SubscriptionsForm.js";

export default function RoutesCMS() {
  return (
    <div>
      <Router>
        <SidebarCMS />
        <div className="wrap-pages">
          <Switch>
            <Route path="/website-cms" exact element={Dashboard} />
            <Route path="/website-cms/home" exact element={Home} />
            <Route
              path="/website-cms/home/form/:type/:id"
              exact
              element={FormHomeSlider}
            />
            <Route path="/website-cms/clients" exact element={Clients} />
            <Route
              path="/website-cms/clients/form/:type/:id"
              exact
              element={ClientsForm}
            />
            <Route path="/website-cms/industries" exact element={Industries} />
            <Route
              path="/website-cms/industries/form/:type/:id"
              exact
              element={IndustriesForm}
            />
            <Route path="/website-cms/services" exact element={Services} />
            <Route
              path="/website-cms/services/form/:type/:id"
              exact
              element={ServicesForm}
            />
            <Route path="/website-cms/topics" exact element={Topics} />
            <Route
              path="/website-cms/topics/form/:type/:id"
              exact
              element={FormTopics}
            />
            <Route path="/website-cms/articles" exact element={Articles} />
            <Route path="/website-cms/webinars" exact element={Webinars} />
            <Route
              path="/website-cms/articles/form/:type/:id"
              exact
              element={FormArticles}
            />
            <Route
              path="/website-cms/webinars/form/:type/:id"
              exact
              element={FormWebinars}
            />
            <Route path="/website-cms/messages" exact element={Messages} />
            <Route
              path="/website-cms/messages/:id"
              exact
              element={MessagesForm}
            />
            <Route path="/website-cms/alumni" exact element={Alumni} />
            <Route
              path="/website-cms/alumni/form/:type/:id"
              exact
              element={AlumniForm}
            />
            <Route path="/website-cms/people" exact element={People} />
            <Route
              path="/website-cms/people/form/:type/:id"
              exact
              element={PeopleForm}
            />
            <Route
              path="/website-cms/subscriptions"
              exact
              element={Subscriptions}
            />
            <Route
              path="/website-cms/subscriptions/:type/:id"
              exact
              element={SubscriptionsForm}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

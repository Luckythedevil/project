import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "../Tables/datatables.scss";

const DeveloperTable = () => {
  const [developerData, setDeveloperData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeveloperData();
  }, []);

  const fetchDeveloperData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/get-developers");
      if (!response.ok) {
        throw new Error('Failed to fetch developers');
      }
      const data = await response.json();
      setDeveloperData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching developer data:", error);
      setLoading(false);
    }
  };

  const tableData = {
    columns: [
      {
        label: "Developer Name",
        field: "developer",
        sort: "asc",
        width: 100,
      },
      {
        label: "Project Count",
        field: "count",
        sort: "asc",
        width: 100,
      },
    ],
    rows: developerData.map(developer => ({
      developer: developer.developer,
      count: developer.count,
    }))
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Projects" breadcrumbItem="Developers" />
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle>
                  Developer Table
                </CardTitle>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <MDBDataTable responsive striped bordered data={tableData} noBottomColumns />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DeveloperTable;

import { Checkbox, Col, Form, Row, Table } from "antd";
import React from "react";
import { Markets } from "../../../store/types";
import { productsColumns } from "./config";

interface MarketDataProps {
  marketsData: Markets | null;
  onClick: () => void;
}

const MarketData: React.FC<MarketDataProps> = ({ marketsData, onClick }) => {
  return marketsData ? (
    <div
      className={
        marketsData.isWorked ? "currentDiv" : "currentDivNoChacked currentDiv"
      }
      onClick={onClick}
    >
      <Row>
        <Col span={12}>
          <h1>{marketsData.place}</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h5 style={{ marginRight: "0.5rem" }}>Market id:</h5>
            <h5>{marketsData.id}</h5>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h5 style={{ marginRight: "0.5rem" }}>Total Amounts:</h5>
            <h5>{marketsData.totalAmount}</h5>
          </div>
          <Row>
            <Col>
              <Form.Item>
                <label htmlFor="isWorked">Is Worked</label>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Checkbox
                  checked={marketsData.isWorked}
                  id="isWorked"
                  className="checkbox-left"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Table
            size="small"
            dataSource={marketsData.marketProducts}
            columns={productsColumns}
            pagination={false}
          />
        </Col>
      </Row>
      <p className="info">If you wont edit Information Click...</p>
    </div>
  ) : null;
};

export default MarketData;

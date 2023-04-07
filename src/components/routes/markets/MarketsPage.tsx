import { Row, Col, Modal, Input, Checkbox, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/Markets.css";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../../store/store";
import { getMarkets } from "../../../store/thunks/marketsThunks";
import { MarketProducts } from "../../../store/types";
import MarketData from "./MarketData";
import { productsColumns } from "./config";
import { Select } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import { setMarkets } from "../../../store/reducers/marketsReducers";
const { Option } = Select;

interface MarketsProps {
  userId: string;
}

interface CurrentMarket {
  id: string;
  place: string;
  totalAmount: string;
  isWorked: boolean;
  marketProducts: MarketProducts;
}

const MarketsPage: React.FC<MarketsProps> = ({ userId }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const markets = useSelector(
    (state: RootState) => state.marketsSlice.marketsData
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [
    currentMarketData,
    setCurrentMarketData,
  ] = useState<CurrentMarket | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<string | undefined>();

  const showModal = (marketData: CurrentMarket | null) => {
    if (marketData) {
      setCurrentMarketData(marketData);
      setSelectedMarket(marketData.place);
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    if (markets && currentMarketData) {
      const updatedMarketsData = markets.map((market) => {
        console.log(JSON.stringify(currentMarketData));
        if (market.id === currentMarketData.id) {
          console.log(JSON.stringify({ ...market, ...currentMarketData }));
          return { ...market, ...currentMarketData };
        } else {
          return market;
        }
      });
      dispatch(setMarkets(updatedMarketsData));
    }
    setIsModalVisible(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentMarketData(
      (prevMarketData) =>
        ({
          ...prevMarketData,
          [name]:
            name === "id" || name === "totalAmount"
              ? value // properties 'id' and 'totalAmount' are strings
              : name === "isWorked"
              ? value === "true" // property 'isWorked' is a boolean
              : value, // property 'place' is a string
        } as CurrentMarket)
    );
  };

  const handleCheckboxChange = (event: CheckboxChangeEvent) => {
    const isChecked = event.target.checked;
    setCurrentMarketData(
      (prevMarket) =>
        ({
          ...prevMarket,
          isWorked: isChecked,
          id: prevMarket && prevMarket.id,
          place: prevMarket && prevMarket.place,
          totalAmount: prevMarket && prevMarket.totalAmount,
        } as CurrentMarket)
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getMarkets(userId));
  }, [dispatch]);

  useEffect(() => {
    const selectedMarketData =
      markets && markets.find((market) => market.place === selectedMarket);
    if (selectedMarketData) {
      setCurrentMarketData(selectedMarketData);
      setSelectedMarket(selectedMarketData.place);
    }
  }, [selectedMarket]);

  return (
    <div className="marketsContainer">
      <Row style={{ height: "50%" }}>
        <Col span={12} style={{ height: "80%" }}>
          <MarketData
            onClick={() => showModal(markets && markets[0])}
            marketsData={markets && markets[0]}
          />
        </Col>
        <Col span={12} style={{ height: "80%" }}>
          <MarketData
            onClick={() => showModal(markets && markets[1])}
            marketsData={markets && markets[1]}
          />
        </Col>
      </Row>
      <Row style={{ height: "50%" }}>
        <Col span={12} style={{ height: "80%" }}>
          <MarketData
            onClick={() => showModal(markets && markets[2])}
            marketsData={markets && markets[2]}
          />
        </Col>
        <Col span={12} style={{ height: "80%" }}>
          <MarketData
            onClick={() => showModal(markets && markets[3])}
            marketsData={markets && markets[3]}
          />
        </Col>
      </Row>
      <Modal
        title={
          currentMarketData ? `Market Data: ${currentMarketData.place}` : ""
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {currentMarketData && (
          <div>
            <div style={{ margin: "10px" }}>
              <Select
                placeholder="Select a market"
                value={selectedMarket}
                onChange={(value) => setSelectedMarket(value)}
              >
                {markets &&
                  markets.map((market) => (
                    <Option key={market.place} value={market.place}>
                      {market.place}
                    </Option>
                  ))}
              </Select>
            </div>
            <div style={{ margin: "10px" }}>
              <label>ID:</label>
              <Input
                onChange={handleInputChange}
                name="id"
                value={currentMarketData.id}
                disabled
              />
            </div>
            <div style={{ margin: "10px" }}>
              <label>Place:</label>
              <Input
                onChange={handleInputChange}
                name="place"
                value={currentMarketData.place}
                disabled
              />
            </div>
            <div style={{ margin: "10px" }}>
              <label>Total Amount:</label>
              <Input
                onChange={handleInputChange}
                name="totalAmount"
                value={currentMarketData.totalAmount}
              />
            </div>
            <div style={{ margin: "15px" }}>
              <label>Is Work ID:</label>
              <Checkbox
                className="marketChekbox"
                name="isWorkid"
                checked={currentMarketData.isWorked}
                onChange={handleCheckboxChange}
              />
            </div>
            <Table
              dataSource={currentMarketData.marketProducts}
              columns={productsColumns}
              pagination={false}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MarketsPage;

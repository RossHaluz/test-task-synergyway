"use client";
import { TickerState, WidgetId } from "@/types/company";
import { JSX, useState } from "react";
import { Mosaic, MosaicNode, MosaicWindow } from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import CompanyInfoWidget from "./CompanyInfoWidget";

const Dashboard = () => {
  const [tickers, setTickers] = useState<TickerState>({
    widget1: "AAPL",
    widget2: "NVDA",
    widget3: "TSLA",
  });

  const [currentNode, setCurrentNode] = useState<MosaicNode<WidgetId> | null>({
    direction: "row",
    first: {
      direction: "column",
      first: "widget1",
      second: "widget2",
      splitPercentage: 50,
    },
    second: "widget3",
    splitPercentage: 66,
  });

  const handleTickerChange = (widgetId: string, tiket: string): void => {
    setTickers((prev) => ({ ...prev, [widgetId]: tiket }));
  };

  const renderTile = (id: WidgetId, path: any): JSX.Element => {
    return (
      <MosaicWindow
        path={path}
        title={`${tickers[id]} - Company information`}
        toolbarControls={
          <div className="flex items-center pr-2">
            <span className="text-xs text-black bg-gray-200 px-2 py-1 rounded">
              Live Data
            </span>
          </div>
        }
      >
        <CompanyInfoWidget
          ticker={tickers[id]}
          onTickerChange={(newTicker: string) =>
            handleTickerChange(id, newTicker)
          }
        />
      </MosaicWindow>
    );
  };

  return (
    <div className="h-screen w-full">
      <div className=" border-b border-slate-700 px-8 py-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-slate-800 font-bold text-slat mb-2 flex items-center gap-3">
              Company Dashboard
            </h1>
            <p className="text-slate-800 text-sm">
              Interactive widgets powered by React Mosaic • Real-time company
              data
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Live
            </span>
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-108px)] p-4">
        <Mosaic<WidgetId>
          renderTile={renderTile}
          value={currentNode}
          onChange={setCurrentNode}
        />
      </div>
    </div>
  );
};

export default Dashboard;

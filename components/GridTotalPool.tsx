import React from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { currency } from "../constants";

function GridTotalPool() {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: currentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );
  return (
    <div className="flex flex-col items-center h-full">
      <h2 className="card-title">Total Pool</h2>
      <div className="flex space-x-6 flex-1 items-center">
        <div className="flex-1">
          <div className="flex">
            <div className="countdown-value">
              {currentWinningReward > 0
                ? Number(
                    ethers.utils.formatEther(currentWinningReward.toString())
                  ).toFixed(2)
                : "0.00"}{" "}
            </div>
            <div className="countdown-message">
              <div className="-rotate-90 text-white/70 mb-0.5">{currency}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridTotalPool;

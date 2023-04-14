import React from "react";
import Marquee from "react-fast-marquee";
import {
  useContract,
  useMetamask,
  useDisconnect,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { currency } from "../constants";

function GridMarquee() {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: lastWinner } = useContractRead(contract, "lastWinner");
  const { data: lastWinnerAmount } = useContractRead(
    contract,
    "lastWinnerAmount"
  );
  return (
    <Marquee className="marquee" gradient={false} speed={50}>
      <div className="flex gap-6">
        <h4 className="text-white">
          {" "}
          // Last Winner - {lastWinner?.toString()} //
        </h4>
        <h4 className="text-white">
          // Rewards -{" "}
          {lastWinnerAmount &&
            ethers.utils.formatEther(lastWinnerAmount?.toString())}{" "}
          {currency} //
        </h4>
      </div>
    </Marquee>
  );
}

export default GridMarquee;

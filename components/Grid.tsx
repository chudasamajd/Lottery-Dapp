import React from "react";
import {
  useContract,
  useMetamask,
  useDisconnect,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { currency } from "../constants";
import GridCountdownTimer from "./GridCountdownTimer";
import GridMenu from "./GridMenu";
import toast from "react-hot-toast";
import GridRemainingTickets from "./GridRemainingTickets";
import GridTotalPool from "./GridTotalPool";
import GridMarquee from "./GridMarquee";
import GridDisclaimer from "./GridDisclaimer";
import GridLogo from "./GridLogo";
import GridQRCode from "./GridQRCode";

function Grid() {
  const address = useAddress();
  const [userTickets, setUserTickets] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: expiration } = useContractRead(contract, "expiration");
  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );
  const { data: currentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );
  const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
  const { data: ticketCommission } = useContractRead(
    contract,
    "ticketCommission"
  );
  const { data: tickets } = useContractRead(contract, "getTickets");
  const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets");
  const { data: winnings } = useContractRead(
    contract,
    "getWinningsForAddress",
    address
  );
  const { mutateAsync: WithdrawWinnings } = useContractWrite(
    contract,
    "WithdrawWinnings"
  );
  const { data: lastWinner } = useContractRead(contract, "lastWinner");
  const { data: lastWinnerAmount } = useContractRead(
    contract,
    "lastWinnerAmount"
  );
  const { data: isLotteryOperator } = useContractRead(
    contract,
    "lotteryOperator"
  );

  const handleClick = async () => {
    if (!ticketPrice) return;

    const notification = toast.loading("Buying tickets..");

    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (
              Number(ethers.utils.formatEther(ticketPrice)) * quantity
            ).toString()
          ),
        },
      ]);

      toast.success("Tickets purchesed successfully!", { id: notification });
    } catch (err) {
      toast.error("Whoops something went wrong", { id: notification });
    }
  };
  return (
    <div className="h-screen p-4 grid-container">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-2 h-full">
        <div className="md:col-span-2 md:row-span-2 card card-1">
          <div className="px-5 py-5 title">Get involved 4 quick win</div>
          <div className="px-5 sub-title">
            // Ticket -{" "}
            {ticketPrice && ethers.utils.formatEther(ticketPrice.toString())}{" "}
            {currency} // Commission - 0.001 MATIC //
          </div>
          <div className="flex flex-col items-center mx-5 my-9">
            <div className="flex items-center bg-white/20 rounded-xl p-2 border border-black/20 w-full">
              <input
                type="number"
                className="h-10 outline-none text-6xl text-black bg-transparent pl-4 flex-1"
                min={1}
                max={100}
                value={quantity > 0 ? quantity : ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="No of Tickets"
              />
              <div className="w-px h-10 seperator"></div>
              <div className="text-md text-right pr-3 font-medium flex-1 ticket-total">
                Total -{" "}
                {ticketPrice &&
                  Number(ethers.utils.formatEther(ticketPrice.toString())) *
                    quantity}{" "}
                {currency}
              </div>
            </div>
            <button
              className="bg-black text-white rounded-full px-14 py-3.5 flex-auto w-min -mt-3"
              disabled={
                expiration?.toString() < Date.now().toString() ||
                remainingTickets?.toNumber() === 0
              }
              onClick={handleClick}
            >
              Buy
            </button>
          </div>
        </div>
        <div className="card card-2">
          <GridCountdownTimer />
        </div>
        <div className="">
          <GridMenu />
        </div>
        <div className="card-4">
          <GridLogo />
        </div>
        <div className="card-qr">
          <GridQRCode />
        </div>
        <div className="card card-6">
          <GridRemainingTickets />
        </div>
        <div className="card card-7">
          <GridTotalPool />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <div className="card card-8">
            <GridMarquee />
          </div>
          <div className="card flex-1 card-9">
            <GridDisclaimer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grid;

import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function EndPoll({ pollId }: { pollId: bigint }) {
  const { writeContractAsync, isMining } = useScaffoldWriteContract({
    contractName: "VotingContract",
  });

  const handleEndPoll = async () => {
    try {
      await writeContractAsync({
        functionName: "endPoll",
        args: [pollId],
      });
      alert("Голосование завершено!");
    } catch (error) {
      console.error(error);
      alert("Ошибка при завершении голосования.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg shadow-xl max-w-sm mx-auto">
      <h3 className="text-2xl font-bold mb-4">Завершить голосование</h3>
      <p className="mb-4">Вы уверены, что хотите завершить голосование?</p>
      <button
        onClick={handleEndPoll}
        disabled={isMining}
        className={`w-full py-2 rounded-lg font-semibold ${isMining ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"}`}
      >
        {isMining ? "Завершение..." : "Завершить голосование"}
      </button>
    </div>
  );
}

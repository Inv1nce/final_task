import { useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function PollResults() {
  const [pollId, setPollId] = useState<number>(-1);

  const { data } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getResults",
    args: [BigInt(pollId)],
  });

  return (
    <div className="p-8 bg-gradient-to-tr from-purple-500 to-indigo-600 text-white rounded-2xl shadow-2xl max-w-lg mx-auto">
      <h3 className="text-3xl font-bold mb-6">Результаты голосования</h3>
      <input
        type="number"
        placeholder="ID голосования"
        onChange={e => setPollId(e.target.value ? Number(e.target.value) : -1)}
        className="w-full p-3 mb-5 bg-indigo-100 text-gray-800 rounded-full border-2 border-indigo-300 focus:ring-4 focus:ring-indigo-500"
      />
      {data && (
        <div className="p-6 bg-gradient-to-tr from-yellow-400 to-red-500 text-gray-900 rounded-2xl shadow-lg w-full">
          <ul className="space-y-3">
            {data[0].map((option: string, idx: number) => (
              <li key={idx} className="text-lg font-medium">
                {option}: <span className="text-yellow-700 font-bold">{Number(data[1][idx])}</span> голосов
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function CreatePoll() {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [optionInput, setOptionInput] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const { writeContractAsync, isMining } = useScaffoldWriteContract({
    contractName: "VotingContract",
  });

  const addOption = () => {
    if (optionInput.trim()) {
      setOptions([...options, optionInput.trim()]);
      setOptionInput("");
    }
  };

  const createPoll = async () => {
    if (question && options.length > 1 && duration > 0) {
      await writeContractAsync({
        functionName: "createPoll",
        args: [question, options, BigInt(duration)],
      });
    } else {
      alert("Пожалуйста, заполните все поля корректно.");
    }
  };

  return (
    <div className="p-8 bg-gray-800 text-yellow-300 rounded-2xl shadow-2xl max-w-md mx-auto">
      <h2 className="text-3xl font-extrabold mb-6">Создать голосование</h2>
      <input
        type="text"
        placeholder="Вопрос голосования"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        className="w-full p-3 mb-5 bg-yellow-100 text-gray-800 rounded-full border-2 border-yellow-300 focus:ring-4 focus:ring-yellow-500"
      />
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Добавить вариант ответа"
          value={optionInput}
          onChange={e => setOptionInput(e.target.value)}
          className="flex-1 p-3 bg-yellow-100 text-gray-800 rounded-full border-2 border-yellow-300 focus:ring-4 focus:ring-yellow-500"
        />
        <button
          onClick={addOption}
          className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-yellow-600"
        >
          Добавить вариант
        </button>
      </div>
      <ul className="list-disc list-inside mb-5">
        {options.map((opt, idx) => (
          <li key={idx} className="text-lg">
            {opt}
          </li>
        ))}
      </ul>
      <input
        type="number"
        placeholder="Длительность (в секундах)"
        value={duration}
        onChange={e => setDuration(Number(e.target.value))}
        className="w-full p-3 mb-5 bg-yellow-100 text-gray-800 rounded-full border-2 border-yellow-300 focus:ring-4 focus:ring-yellow-500"
      />
      <button
        onClick={createPoll}
        disabled={isMining}
        className={`w-full py-3 rounded-full font-bold text-gray-800 ${isMining ? "bg-gray-500" : "bg-yellow-500 hover:bg-yellow-600"}`}
      >
        {isMining ? "Создание..." : "Создать голосование"}
      </button>
    </div>
  );
}

export type Udhetim = {
  id: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  shoferi: string;
  vendtakimi: string;
  vende: number;
};

export const udhetimet: Udhetim[] = [
  {
    id: "1", nisja: "Prishtinë", destinacioni: "AAB", ora: "07:30",
    shoferi: "Dreni", vendtakimi: "Sheshi Skënderbeu", vende: 2
  },
  {
    id: "2", nisja: "Fushë Kosovë", destinacioni: "AAB", ora: "08:00",
    shoferi: "Blerta", vendtakimi: "Te stacioni i trenit", vende: 1
  },
  {
    id: "3", nisja: "Lipjan", destinacioni: "AAB", ora: "08:15",
    shoferi: "Gent", vendtakimi: "Qendra e qytetit", vende: 0
  },
];

export function gjejUdhetimin(id: string) {
  return udhetimet.find((udhetim) => udhetim.id === id);
}

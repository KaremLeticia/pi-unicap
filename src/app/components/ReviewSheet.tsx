import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const titles = [
  "1.1 Foi assídua e pontual.",
  "1.2 Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "1.3 Promoveu a integração da teoria com a prática.",
  "1.4 Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "1.5 Demonstrou clareza na exposição do conteúdo das disciplinas.",
  "1.6 Utilizou metodologias inovadoras ativas.",
  "1.7 Utilizou recursos adequados ao ensino das disciplinas.",
  "1.8 Apresentou avaliações coerentes com os conteúdos ministrados.",
  "1.9 Apresentou um bom relacionamento com a turma e proporcionou um clima de respeito mútuo e ético.",
];

export function ReviewSheet() {
  const [selectedValues, setSelectedValues] = useState({}); // Estado para armazenar os valores selecionados

  const handleRadioChange = (title: string, value: string) => {
    setSelectedValues(prevValues => {
      const updatedValues = { ...prevValues, [title]: value };
      console.log(`Title: ${title}, Value: ${value}`); // Log para mostrar o título e o valor selecionado
      return updatedValues;
    });
  };
  

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <ScrollArea className="h-full">
          <SheetHeader>
            <SheetTitle>Avalie a matéria</SheetTitle>
            <SheetDescription>
              Manifeste o seu grau de concordância com as afirmações a seguir, segundo a escala que apresenta uma variação de 1 (discordo totalmente) a 5 (concordo plenamente). Caso você julgue não ter elementos para avaliar a afirmação ou quando considerar não pertinente ao seu curso, assinale a opção “Sem Opinião/Não se aplica” como 0.
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-2" />

          {titles.map((title, index) => (
            <div key={index}>
              <p className="text-black font-medium">{title}</p>
              <RadioGroupDemo
                value={selectedValues[title] || null} // Define o valor com base no estado
                onChange={(value: any) => handleRadioChange(title, value)}
              />
            </div>
          ))}

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function RadioGroupDemo({ value, onChange }: any) {
  return (
    <RadioGroup className='flex space-x-4 justify-center mb-4' value={value} onChange={onChange}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={null} id="0" />
        <Label htmlFor="0">0</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="1" id="1" />
        <Label htmlFor="1">1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="2" id="2" />
        <Label htmlFor="2">2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="3" id="3" />
        <Label htmlFor="3">3</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="4" id="4" />
        <Label htmlFor="4">4</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="5" id="5" />
        <Label htmlFor="5">5</Label>
      </div>
    </RadioGroup>
  );
}

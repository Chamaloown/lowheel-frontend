import { useState } from "react";
import { getChampions } from "./api/champions";
import { Button } from "./components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQuery } from "@tanstack/react-query";
import Wheel from "./components/wheel/wheel";
import type { Role } from "./type/role";
import { useForm } from "@tanstack/react-form";
import { postReviews } from "./api/reviews";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";

function App() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const { data: champions, refetch } = useQuery({
    queryKey: ["champions", selectedRole],
    queryFn: () => getChampions(selectedRole),
    enabled: false,
  });

  const form = useForm({
    defaultValues: {
      role: "",
      champion: "",
      win: false,
      note: "",
    },
    onSubmit: async ({ value }) => postReviews(value),
  });

  const games = [
    {
      role: "Top",
      champion: "Sett",
      win: true,
      note: "Great game!",
    },
    {
      role: "Mid",
      champion: "Leblanc",
      win: false,
      note: "Tough match",
    },
    {
      role: "Jungle",
      champion: "Kha'Zix",
      win: true,
      note: "Excellent ganks",
    },
    {
      role: "ADC",
      champion: "Jhin",
      win: true,
      note: "MVP performance",
    },
    {
      role: "Support",
      champion: "Janna",
      win: true,
      note: "Perfect support",
    },
  ];

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-9xl">Lowheel</h1>
      <h3>Autofill Wheel and review yours games!</h3>
      <div className="flex flex-row justify-center space-y-4 pb-4">
        <Select onValueChange={(value) => setSelectedRole(value as Role)}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Support">Support</SelectItem>
            <SelectItem value="ADC">ADC</SelectItem>
            <SelectItem value="Top">Top</SelectItem>
            <SelectItem value="Mid">Mid</SelectItem>
            <SelectItem value="Jungle">Jungle</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="ml-4 hover:opacity-75" onClick={() => refetch()}>
          Fetch Champions
        </Button>
      </div>

      <div className="h-0.5 w-11/12 bg-amber-500"></div>

      {champions && (
        <div>
          <div className="h-0.5 w-11/12 bg-amber-500"></div>
          <Wheel champions={champions || []} />
        </div>
      )}

      <div className="w-2/4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="border-2 border-white rounded-lg m-8 p-8 space-y-4">
            <div>
              <form.Field
                name="role"
                validators={{
                  onChange: ({ value }) => (!value ? "A role is required" : undefined),
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => {
                  return (
                    <>
                      <Label htmlFor={field.name}>Role</Label>
                      <Select onValueChange={(value) => field.handleChange(value)}>
                        <SelectTrigger className="w-45">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Support">Support</SelectItem>
                          <SelectItem value="ADC">ADC</SelectItem>
                          <SelectItem value="Top">Top</SelectItem>
                          <SelectItem value="Mid">Mid</SelectItem>
                          <SelectItem value="Jungle">Jungle</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="champion"
                validators={{
                  onChange: ({ value }) => (!value ? "A champion is required" : undefined),
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => {
                  return (
                    <>
                      <Label htmlFor={field.name}>Champion</Label>
                      <Input
                        id={field.name}
                        type="text"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="win"
                children={(field) => {
                  return (
                    <>
                      <Checkbox
                        id={field.name}
                        checked={field.state.value || false}
                        onCheckedChange={(checked) => field.handleChange(checked as boolean)}
                      />
                      <Label htmlFor={field.name}>Win?</Label>
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field name="note">
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Note</Label>
                    <Textarea
                      id={field.name}
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )}
              </form.Field>
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <>
                  <div className="flex flex-row space-x-4">
                    <Button
                      variant={"outline"}
                      className="hover:opacity-75"
                      type="submit"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? "..." : "Submit"}
                    </Button>
                    <Button
                      className="hover:opacity-75"
                      variant={"outline"}
                      type="reset"
                      onClick={(e) => {
                        // Avoid unexpected resets of form elements (especially <select> elements)
                        e.preventDefault();
                        form.reset();
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </>
              )}
            />
          </div>
        </form>
      </div>

      <div className="h-0.5 w-11/12 bg-amber-500"></div>

      <div className="w-4/12">
        <Table>
          <TableCaption>A list of your recent games.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Role</TableHead>
              <TableHead>Champion</TableHead>
              <TableHead>Result</TableHead>
              <TableHead className="text-right">Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.role}>
                <TableCell className="font-medium">{game.role}</TableCell>
                <TableCell>{game.champion}</TableCell>
                <TableCell>
                  {game.win ? (
                    <span className="text-green-500">Win</span>
                  ) : (
                    <span className="text-red-500">Loss</span>
                  )}
                </TableCell>
                <TableCell className="text-right">{game.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;

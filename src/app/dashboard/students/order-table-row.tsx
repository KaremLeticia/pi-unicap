"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'



export function OrderTableRow({ id, email, name, surname, studentRegister, role, createdAt, school, accountAge }: any) {

  function OrderDetails() {
    return (
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>{id}</DialogTitle>
          <DialogDescription>Detalhes do aluno</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Table>
            <TableBody>

              <TableRow>
                <TableCell className="text-muted-foreground">Aluno</TableCell>
                <TableCell className="flex justify-end">
                  {name} {surname}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  RA
                </TableCell>
                <TableCell className="flex justify-end">{studentRegister}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  {email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Escola</TableCell>
                <TableCell className="flex justify-end">
                  {school}
                </TableCell>
              </TableRow>


              <TableRow>
                <TableCell className="text-muted-foreground">Criado em</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="font-medium text-muted-foreground">
                      {createdAt}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </div>
      </DialogContent>
    )
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="default">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do aluno</span>
            </Button>
          </DialogTrigger>
          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {id}
      </TableCell>
      <TableCell className="text-muted-foreground">{name}</TableCell>

      <TableCell className="font-medium">{email}</TableCell>
      <TableCell className="font-medium">{studentRegister}</TableCell>
      <TableCell className="font-medium">{school}</TableCell>

      <TableCell>
        <Button variant="ghost" size="default">
          <X className="h-3 w-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}

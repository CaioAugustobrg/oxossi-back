/* eslint-disable n/handle-callback-err */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type BookRepository } from './bookRepository'
import { Book } from '../entities/book'
import { type BookDTO } from '../DTO/findBookDTO'
import axios from 'axios'
// import { resolve } from 'path'

export class JsonBookRepository implements BookRepository {
  async findBook (props?: BookDTO): Promise<Book | null> {
    const url = 'https://caioaugustobrg.github.io/database/dados.json'
    const response = await axios.get(url)
    const contentsArray = response.data
    const yearsArray: any = []
    if (props?.datas) {
      const { anoFinal } = props.datas
      for (let year = props.datas.anoInicial; year <= anoFinal; year++) {
        yearsArray.push(year)
      }
    }
    const filteredJson = contentsArray.filter((item: any) => {
      const datas = item?.datas
      const datasWithoutSpecialChars = datas
        ? datas.replace(/\[|\]|\-|'/g, '')
        : ''
      const datasArray: number[] = datasWithoutSpecialChars.split(',').map(Number)
      return (
        (!props?.lugares || (item && item.lugares && item.lugares.toLowerCase().includes(props.lugares.toLocaleLowerCase()))) &&
           (!props?.autores || (item && item.autores && item.autores.toLowerCase().includes(props.autores.toLowerCase()))) &&
           (!props?.temas || (item && item.temas && item.temas.toLowerCase().includes(props.temas.toLowerCase()))) &&
           (!props?.capitania || (item && item.capitania && item.capitania.toLowerCase().includes(props.capitania.toLowerCase()))) &&
           (!props?.titulo || (item && item.titulo && item.titulo.toLowerCase().includes(props.titulo.toLowerCase()))) &&
           (!props?.nomes || (item && item.nomes && item.nomes.toLowerCase().includes(props.nomes.toLowerCase()))) &&
           (!props?.anoPub || (item && item.anoPub && item.anoPub.toLowerCase().includes(props.anoPub.toLowerCase()))) &&
           (!props?.tematicas || (item && item.tematicas && item.tematicas.toLowerCase().includes(props.tematicas.toLowerCase()))) &&
           (!props?.periodoA || (item && item.periodoA && item.periodoA.toLowerCase().includes(props.periodoA.toLowerCase()))) &&
           (yearsArray.length === 0 || datasArray.some((year: number) => yearsArray.includes(year))))
    })

    if (filteredJson.length > 0) {
      const booksFiltered = filteredJson.map((bookData: BookDTO) => new Book(bookData))
      return booksFiltered
    } else {
      return null
    }
  }
}

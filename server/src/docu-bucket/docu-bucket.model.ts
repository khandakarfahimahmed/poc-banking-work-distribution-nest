import { Sequelize, Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IPdfList } from './docu-bucket.interface';

@Table({
  tableName: 'docu-bucket',
  timestamps: true,
  freezeTableName: true,
})
export class PdfList extends Model<PdfList> implements IPdfList {
  @Column({ primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER })
  id: number;
  @Column
  acc_id: number;
  @Column
  customer_id: number;
  @Column // Adjust column type for array of strings
  pdf_id: number;
  @Column(DataTypes.ARRAY(DataTypes.STRING)) // Adjust column type for array of strings
  pdf_values: string[];
}

export default PdfList;

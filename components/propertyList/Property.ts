import { ApartmentsResponse } from '@/lib/queries';
import { formatDate, formatPrice, formatString } from '@/utils/format';

type ResponseProperty = ApartmentsResponse['content'][number];

export class Property {
  public data!: ResponseProperty;

  constructor(data: ResponseProperty) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get apartName() {
    return this.data.apartName;
  }

  get dong() {
    return formatString(this.data.dong, (dong) => `${dong}동`);
  }

  get supplyArea() {
    return formatString(this.data.supplyArea, (dong) => `${dong}㎡`);
  }

  get floor() {
    return this.data.floorType;
  }

  get hopePrice() {
    const 매매 = this.data.price ? `매매 ${formatPrice(this.data.price)}` : undefined;
    const 전세 = this.data.deposit ? `전세 ${formatPrice(this.data.deposit)}` : undefined;
    const 월세 =
      this.data.monthlyDeposit && this.data.monthlyRentPrice
        ? `월세 ${formatPrice(this.data.monthlyDeposit)} / ${formatPrice(this.data.monthlyRentPrice)}`
        : undefined;

    return [매매, 전세, 월세].filter(Boolean).join(`\n`);
  }

  get availableMoveInDate() {
    return this.data.availableMoveInDate;
  }

  get memo() {
    return this.data.memo;
  }

  get createDatetime() {
    return formatDate(this.data.createDatetime);
  }

  get unitCount() {
    return `총 ${this.data.unitCount}세대`;
  }

  get doroAddress() {
    return this.data.doroAddress;
  }

  get managementCost() {
    return this.data.managementCost;
  }

  get numberOfParkingSpaces() {
    return `총 ${this.data.numberOfParkingSpaces}대`;
  }

  get dongCount() {
    return `${this.data.dongCount}개`;
  }

  get developer() {
    return this.data.developer;
  }

  // custom
  get info() {
    return [this.data.dong, this.data.floorType, this.data.directionOfHouse, this.data.floorPlanType];
  }

  get areaDescription() {
    return `${this.data.supplyArea}/${this.data.exclusiveArea}`;
  }

  get exclusiveRate() {
    return `${Math.round((Number(this.data.exclusiveArea) / Number(this.data.supplyArea)) * 100)}%`;
  }

  get finalConformationDate() {
    const date = formatDate(this.data.confirmationDate) || '-';
    return `${date} ${this.data.confirmationType ?? ''}`;
  }
}

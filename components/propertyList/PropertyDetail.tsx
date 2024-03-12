'use client';
import { ApartmentsResponse } from '@/lib/queries';
import { formatDate } from '@/utils/format';
import { HStack, VStack } from '@components/Stack';
import { Table } from '@components/Table';

export const PropertyDetail = ({ data }: { data: ApartmentsResponse['content'][number] }) => {
  return (
    <div>
      <VStack className="gap-40">
        <VStack className="gap-6">
          <HStack className="text-darkGray-40">
            <div>매물번호</div>
            <div>{data.id}</div>
          </HStack>
          <h2 className="text-32 font-bold text-darkGray-70">{data.apartName}</h2>
        </VStack>

        <VStack className="gap-6 ">
          <div>매물정보</div>
          <HStack className="gap-20">
            <div className="text-22 font-bold text-[#1939AC]">{data.dong}</div>
            <div className="text-22 font-bold text-[#1939AC]">{data.floorType}</div>
            <div className="text-22 font-bold text-[#1939AC]">{data.directionOfHouse}</div>
            <div className="text-22 font-bold text-[#1939AC]">{data.floorPlanType}</div>
          </HStack>
        </VStack>

        <div className="cols grid grid-cols-2 gap-y-38">
          <VStack className="gap-6">
            <div>공급/전용면적</div>
            <div className="text-22 font-bold text-[#1939AC]">
              {data.supplyArea}/{data.exclusiveArea}
            </div>
          </VStack>

          <VStack className="gap-6">
            <div>전용률</div>
            <div className="text-22 font-bold text-[#1939AC]">
              {Math.round((Number(data.exclusiveArea) / Number(data.supplyArea)) * 100)}%
            </div>
          </VStack>

          <VStack className="gap-6">
            <div>희망가격</div>
            <div className="text-22 font-bold text-[#1939AC]">{data.price}</div>
          </VStack>

          <VStack className="gap-6">
            <div>입주가능일</div>
            <div className="text-22 font-bold text-[#1939AC]">{data.availableMoveInDate}</div>
          </VStack>
        </div>

        <div className="aspect-[487/307] bg-[#858585]"></div>

        <VStack className="gap-6">
          <div>집주인정보</div>
          <div className="aspect-[487/140] rounded-4 bg-[#858585]" />
        </VStack>

        <VStack className="gap-6">
          <div>단지정보</div>

          <Table.Root>
            <Table.Row>
              <Table.Head>등록일</Table.Head>
              <Table.Cell>{formatDate(data.createDatetime)}</Table.Cell>
              <Table.Head>최종확인일</Table.Head>
              <Table.Cell>
                {formatDate(data.confirmationDate)} {data.confirmationType}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Head>세대수</Table.Head>
              <Table.Cell>총 {data.unitCount}세대</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Head>주소</Table.Head>
              <Table.Cell>{data.doroAddress}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Head>관리비</Table.Head>
              <Table.Cell>{data.managementCost}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Head>주차대수</Table.Head>
              <Table.Cell>총 {data.numberOfParkingSpaces}대</Table.Cell>
              <Table.Head>준공연도</Table.Head>
              <Table.Cell>?</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Head>동수</Table.Head>
              <Table.Cell>{data.dongCount}개</Table.Cell>
              <Table.Head>건설사</Table.Head>
              <Table.Cell>{data.developer}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Head>비고/특징</Table.Head>
              <Table.Cell className="whitespace-pre-line">{data.memo}</Table.Cell>
            </Table.Row>
          </Table.Root>
        </VStack>
      </VStack>
    </div>
  );
};

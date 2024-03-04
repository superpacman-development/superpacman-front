'use client';
import { ApartmentsResponse } from '@/lib/queries';
import { HStack, VStack } from '@components/Stack';

export const PropertyDetail = ({ data }: { data: ApartmentsResponse['content'][number] }) => {
  return (
    <div>
      <VStack className="gap-40">
        <VStack className="gap-6">
          <HStack>
            <div>매물번호</div>
            <div>{data.id}</div>
          </HStack>
          <h2>{data.apartName}</h2>
        </VStack>

        <VStack className="gap-6">
          <div>매물정보</div>
          <HStack className="gap-20">
            <div>{data.dong}</div>
            <div>{data.floorType}</div>
            <div>{data.directionOfHouse}</div>
            <div>{data.floorPlanType}</div>
          </HStack>
        </VStack>

        <div className="grid grid-cols-2">
          <VStack className="gap-6">
            <div>공급/전용면적</div>
            <div>
              {data.supplyArea}/{data.exclusiveArea}
            </div>
          </VStack>

          <VStack className="gap-6">
            <div>전용률</div>
            <div>{Math.round(Number(data.exclusiveArea) / Number(data.supplyArea))}%</div>
          </VStack>

          <VStack className="gap-6">
            <div>희망가격</div>
            <div>{data.price}</div>
          </VStack>

          <VStack className="gap-6">
            <div>입주가능일</div>
            <div>{data.availableMoveInDate}</div>
          </VStack>
        </div>

        <div className="aspect-[487/307] bg-[#858585]"></div>

        <VStack className="gap-6">
          <div>집주인정보</div>
          <div className="aspect-[487/140] rounded-4 bg-[#858585]" />
        </VStack>

        <VStack className="gap-6">
          <div>단지정보</div>

          <VStack>
            <HStack>
              <div className="flex-shrink-0 flex-grow-0 basis-[2]">등록일</div>
              <div className="flex-grow-0 basis-[calc(100%_/_2)]">{data.confirmationDate}</div>
              <div className="flex-shrink-0 flex-grow-0 basis-[2]">확인일</div>
              <div className="flex-grow basis-[calc(100%_/_2)]">{data.confirmationDate}</div>
            </HStack>
            <HStack>
              <div className="flex-shrink-0 flex-grow-0 basis-[2]">세대수</div>
              <div className="flex-grow basis-[calc(100%_/_2)]">{data.confirmationDate}</div>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </div>
  );
};

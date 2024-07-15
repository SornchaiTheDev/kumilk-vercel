"use client";

import { useRef, useState } from "react";
import { Combobox, Loader, TextInput, useCombobox } from "@mantine/core";
import { api } from "@/trpc/react";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { AppRouter } from "@/server/api/root";
import { inferRouterOutputs } from "@trpc/server";
import { TRPCClientErrorLike } from "@trpc/client";
import { useRouter } from "next/navigation";

type SearchItemApi = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>["customer"]["product"]["search"],
  TRPCClientErrorLike<AppRouter>
>["data"];
type SearchItem =
  NonNullable<SearchItemApi> extends (infer T)[] | null | undefined ? T : never;

export default function SearchBar() {
  const router = useRouter();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SearchItem[] | null>(null);
  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(false);
  const abortController = useRef<AbortController>();

  const searchApi = api.customer.product.search.useMutation();

  const fetchOptions = (query: string) => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    setLoading(true);

    abortController.current?.signal.addEventListener("abort", () => {
      return;
    });
    searchApi.mutate(
      {
        search: query,
      },
      {
        onSuccess: (result) => {
          setData(result);
          setLoading(false);
          setEmpty(result.length === 0);
          abortController.current = undefined;
        },
      },
    );
  };

  const options = (data ?? []).map((item) => (
    <Combobox.Option value={item.id} key={item.id} className="py-3 md:py-2">
      {item.name}
    </Combobox.Option>
  ));

  return (
    <div className="mt-2 flex gap-3">
      <Combobox
        onOptionSubmit={(optionValue) => {
            router.push(`/product/${optionValue}`)
        }}
        withinPortal={false}
        store={combobox}
      >
        <Combobox.Target>
          <TextInput
            radius="xl"
            placeholder="ค้นหาสินค้า"
            size="lg"
            className="w-full"
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              fetchOptions(event.currentTarget.value);
              combobox.resetSelectedOption();
              combobox.openDropdown();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => {
              combobox.openDropdown();
              if (data === null) {
                fetchOptions(value);
              }
            }}
            onBlur={() => combobox.closeDropdown()}
            rightSection={loading && <Loader size={18} />}
          />
        </Combobox.Target>

        <Combobox.Dropdown hidden={data === null}>
          <Combobox.Options>
            {options}
            {empty && <Combobox.Empty>No results found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

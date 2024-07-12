import { Button, ButtonGroup, rem, Text } from "@mantine/core";

interface Props {}

export default function CartItem(props: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <img
          className="h-28 min-w-28 rounded-2xl object-cover md:h-40 md:min-w-40"
          src="https://scontent.fbkk22-2.fna.fbcdn.net/v/t39.30808-6/449438961_967719798480716_8359141525197656130_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHmv2coW3q4udf0JiJ11PjjwQGtY14OaYjBAa1jXg5piJ9csufZsOSG4dJ26TCrkUn1yLpLiFIurd6cwadxCgVi&_nc_ohc=SkrqjeCG56oQ7kNvgH9VQyP&_nc_zt=23&_nc_ht=scontent.fbkk22-2.fna&oh=00_AYB1BdUCJ7yc196jcSVihoZBF57F_LDN6NOLb6NViiy1xA&oe=6696B4DB"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between py-1">
        <div className="flex flex-col">
          <Text fw={700} className="line-clamp-1 text-xl md:text-2xl">
            นมถุงรสส้ม
          </Text>
          <Text className="line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
            mollitia quisquam, voluptatibus obcaecati eius placeat, aspernatur
            dolorem vitae sequi magnam suscipit. Dolor esse similique iure
            aspernatur ullam voluptatibus voluptate distinctio.
          </Text>
        </div>
        <div className="flex flex-col gap-2">
          <Text fw={700} className="line-clamp-1 text-xl md:text-2xl">
            500 บาท
          </Text>
          <div className="flex">
            <ButtonGroup>
              <Button size="xs" variant="outline">
                -
              </Button>
              <Button size="xs" variant="outline">
                1
              </Button>
              <Button size="xs" variant="outline">
                +
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function CustomerDetailsCard() {
  return (
    <div className="px-6 pt-6">
      <Card className="border-gray-300">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {/* Left column */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Label htmlFor="name" className="w-28 font-medium">
                  Name
                </Label>
                <Input id="name" type="text" placeholder="Patient Name" />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="phone" className="w-28 font-medium">
                  Phone
                </Label>
                <Input id="phone" type="tel" placeholder="Phone Number" />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="address" className="w-28 font-medium">
                  Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Address"
                  className="h-10"
                />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Label htmlFor="invoice_no" className="w-28 font-medium">
                  Invoice No.
                </Label>
                <Input
                  id="invoice_no"
                  type="text"
                  placeholder="1899"
                  disabled
                />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="date" className="w-28 font-medium">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  disabled
                />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="doctor" className="w-28 font-medium">
                  Doctor
                </Label>
                <Input id="doctor" type="text" placeholder="Doctor Name" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

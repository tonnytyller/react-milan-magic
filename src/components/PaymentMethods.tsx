import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Phone, MessageCircle, Banknote } from 'lucide-react';

interface PaymentMethodsProps {
  totalAmount: number;
  onPaymentSubmit: (method: string, mpesaCode?: string) => void;
}

export const PaymentMethods = ({ totalAmount, onPaymentSubmit }: PaymentMethodsProps) => {
  const [selectedMethod, setSelectedMethod] = useState('mpesa');
  const [mpesaCode, setMpesaCode] = useState('');

  const depositAmount = (totalAmount * 0.3).toFixed(2);

  const handleSubmit = () => {
    if (selectedMethod === 'mpesa' && !mpesaCode) {
      return;
    }
    if (selectedMethod === 'cash_delivery' && !mpesaCode) {
      return;
    }
    onPaymentSubmit(selectedMethod, mpesaCode);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
          {/* M-Pesa Send Money */}
          <div className="flex items-start space-x-3 p-4 border rounded-lg">
            <RadioGroupItem value="mpesa" id="mpesa" />
            <div className="flex-1">
              <Label htmlFor="mpesa" className="flex items-center gap-2 font-semibold cursor-pointer">
                <Phone className="h-5 w-5" />
                M-Pesa Send Money
              </Label>
              {selectedMethod === 'mpesa' && (
                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-semibold">Send to:</p>
                    <p className="text-lg font-bold">+254 791 174 063</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Amount: KSh {totalAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="mpesa-code">M-Pesa Transaction Code</Label>
                    <Input
                      id="mpesa-code"
                      placeholder="e.g., QA12BC3456"
                      value={mpesaCode}
                      onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cash on Delivery */}
          <div className="flex items-start space-x-3 p-4 border rounded-lg">
            <RadioGroupItem value="cash_delivery" id="cash_delivery" />
            <div className="flex-1">
              <Label htmlFor="cash_delivery" className="flex items-center gap-2 font-semibold cursor-pointer">
                <Banknote className="h-5 w-5" />
                Cash on Delivery (30% Deposit)
              </Label>
              {selectedMethod === 'cash_delivery' && (
                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-semibold">Pay 30% deposit via M-Pesa to:</p>
                    <p className="text-lg font-bold">+254 791 174 063</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Deposit: KSh {depositAmount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Remaining: KSh {(totalAmount - Number(depositAmount)).toLocaleString('en-KE', { minimumFractionDigits: 2 })} (pay on delivery)
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="deposit-code">M-Pesa Deposit Code</Label>
                    <Input
                      id="deposit-code"
                      placeholder="e.g., QA12BC3456"
                      value={mpesaCode}
                      onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* WhatsApp Payment */}
          <div className="flex items-start space-x-3 p-4 border rounded-lg">
            <RadioGroupItem value="whatsapp" id="whatsapp" />
            <div className="flex-1">
              <Label htmlFor="whatsapp" className="flex items-center gap-2 font-semibold cursor-pointer">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Payment
              </Label>
              {selectedMethod === 'whatsapp' && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Click below to arrange payment via WhatsApp
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      const message = `Hello Milan Crochet! I'd like to complete my order of KSh ${totalAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
                      window.open(`https://wa.me/254791174063?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </div>
              )}
            </div>
          </div>
        </RadioGroup>

        <Button 
          className="w-full" 
          size="lg"
          onClick={handleSubmit}
          disabled={
            (selectedMethod === 'mpesa' && !mpesaCode) ||
            (selectedMethod === 'cash_delivery' && !mpesaCode)
          }
        >
          {selectedMethod === 'whatsapp' ? 'Continue with WhatsApp' : 'Place Order'}
        </Button>
      </CardContent>
    </Card>
  );
};

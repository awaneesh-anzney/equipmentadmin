"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Clock, Package } from "lucide-react";
import { useState } from "react";
import { materialTypes, vehicleCategories, DUTY_HOURS_OPTIONS, DIESEL_BY_OPTIONS, PAYMENT_CYCLE_OPTIONS, RATE_TYPE_OPTIONS } from "@/data/mockData";

interface CreateRequirementModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateRequirementModal({ isOpen, onOpenChange }: CreateRequirementModalProps) {
    const [equipmentList, setEquipmentList] = useState([
        { id: 1, category: "", capacity: "", quantity: "", rateType: "" }
    ]);

    const addEquipment = () => {
        setEquipmentList([...equipmentList, { id: Date.now(), category: "", capacity: "", quantity: "", rateType: "" }]);
    };

    const removeEquipment = (id: number) => {
        if (equipmentList.length > 1) {
            setEquipmentList(equipmentList.filter(item => item.id !== id));
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[95vh] flex flex-col p-8 border-none bg-white shadow-2xl rounded-xl gap-6 overflow-y-auto [&>button]:right-4 [&>button]:top-4 [&>button]:opacity-40 hover:[&>button]:opacity-100 [&>button]:bg-transparent [&>button]:border-none [&>button]:shadow-none [&>button]:h-6 [&>button]:w-6 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button>svg]:h-4 [&>button>svg]:w-4 focus-visible:outline-none">
                <DialogHeader className="p-0 border-none shrink-0 mb-2">
                    <DialogTitle className="text-xl font-bold tracking-tight text-foreground">New Requirement</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-8">
                    {/* Section 1: General Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Project Name</Label>
                            <Input placeholder="e.g. Pakri Barwadih Mine" className="h-10 border-border/50 bg-slate-50/50 focus:bg-white hover:border-primary/40 focus:border-primary transition-all duration-200" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Client Name</Label>
                            <Input placeholder="e.g. NTPC Ltd" className="h-10 border-border/50 bg-slate-50/50 focus:bg-white hover:border-primary/40 focus:border-primary transition-all duration-200" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Site Location</Label>
                            <Input placeholder="e.g. Jharkhand" className="h-10 border-border/50 bg-slate-50/50 focus:bg-white hover:border-primary/40 focus:border-primary transition-all duration-200" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Material Type</Label>
                            <Select>
                                <SelectTrigger className="w-full h-10 border-border/50 bg-slate-50/50 hover:border-primary/40 focus:border-primary transition-all duration-200">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {materialTypes.map(m => (
                                        <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Section 2: Equipment Requirements */}
                    <div className="space-y-6 pt-2">
                        <div className="flex items-center justify-between border-b border-dashed border-border/60 pb-2">
                            <div className="flex items-center gap-2">
                                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10">
                                    <Package className="h-3 w-3 text-primary" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-[16px] font-bold text-foreground">Equipment / Vehicles Required</h3>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={addEquipment}
                                className="h-8 gap-1.5 text-[12px] font-bold text-foreground rounded-md px-4 border border-border/50 hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                                <Plus className="h-3 w-3" strokeWidth={3} />
                                Add Type
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {equipmentList.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end relative group">
                                    <div className="md:col-span-3 space-y-1.5">
                                        <Label className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest">Category</Label>
                                        <Select>
                                            <SelectTrigger className="w-full h-10 border-border/50 bg-slate-50/50 hover:border-primary/40 focus:border-primary transition-all duration-200 font-medium">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {vehicleCategories.map(v => (
                                                    <SelectItem key={v} value={v.toLowerCase()}>{v}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="md:col-span-3 space-y-1.5">
                                        <Label className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest">Capacity</Label>
                                        <Input placeholder="e.g. 20 Ton" className="h-10 border-border/50 bg-slate-50/50 hover:border-primary/40 focus:border-primary transition-all duration-200 font-medium" />
                                    </div>
                                    <div className="md:col-span-2 space-y-1.5">
                                        <Label className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest">Quantity</Label>
                                        <Input placeholder="e.g. 10" className="h-10 border-border/50 bg-slate-50/50 hover:border-primary/40 focus:border-primary transition-all duration-200 font-medium" />
                                    </div>
                                    <div className="md:col-span-3 space-y-1.5">
                                        <Label className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest">Rate Type</Label>
                                        <Select>
                                            <SelectTrigger className="w-full h-10 border-border/50 bg-slate-50/50 hover:border-primary/40 focus:border-primary transition-all duration-200 font-medium">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {RATE_TYPE_OPTIONS.map(opt => (
                                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="md:col-span-1 flex justify-end pb-0.5">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/5"
                                            onClick={() => removeEquipment(item.id)}
                                            disabled={equipmentList.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Terms & Reporting */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Reporting Time</Label>
                            <div className="relative">
                                <Input type="time" className="h-10 border-border/50 bg-slate-50/50 focus:bg-white hover:border-primary/40 focus:border-primary transition-all duration-200 pl-3 pr-10 font-medium" />
                                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Duty Hours</Label>
                            <Select>
                                <SelectTrigger className="w-full h-10 border-border/50 bg-slate-50/50 hover:border-primary/40 focus:border-primary transition-all duration-200 font-medium">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {DUTY_HOURS_OPTIONS.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Diesel By</Label>
                            <Select>
                                <SelectTrigger className="w-full h-10 border-border/50 bg-slate-50/50 hover:border-primary/40 focus:border-primary transition-all duration-200 font-medium">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {DIESEL_BY_OPTIONS.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Payment Cycle</Label>
                            <Select>
                                <SelectTrigger className="w-full h-10 border-border/50 bg-slate-50/50 hover:border-primary/40 focus:border-primary transition-all duration-200 font-medium">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PAYMENT_CYCLE_OPTIONS.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Start Date</Label>
                            <Input type="date" className="h-10 border-border/50 bg-slate-50/50 focus:bg-white hover:border-primary/40 focus:border-primary transition-all duration-200 font-medium" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">End Date</Label>
                            <Input type="date" className="h-10 border-border/50 bg-slate-50/50 focus:bg-white hover:border-primary/40 focus:border-primary transition-all duration-200 font-medium" />
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex justify-end gap-3 pt-6">
                    <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-11 px-8 font-bold text-muted-foreground/70 hover:bg-muted transition-all">Discard</Button>
                    <Button className="h-11 px-12 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all rounded-lg">Save as Draft</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

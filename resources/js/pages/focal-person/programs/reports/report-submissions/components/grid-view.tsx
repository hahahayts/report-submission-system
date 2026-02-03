import { updateStatus } from '@/actions/App/Http/Controllers/ReportSubmissionController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReportSubmission } from '@/types';
import { Form } from '@inertiajs/react';
import { Download, EllipsisVertical, Eye, FileText } from 'lucide-react';

export default function GridView({
    reportSubmissions,
}: {
    reportSubmissions: ReportSubmission[];
}) {
    return (
        <div className="grid grid-cols-3 gap-5">
            {reportSubmissions.map((submission) => (
                <div
                    key={submission.id}
                    className="group relative flex flex-col rounded-xl border border-border bg-background p-4 transition hover:shadow-md"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between pb-2">
                        <h1 className="text-sm font-semibold">Report Files</h1>

                        <button
                            className="rounded-full p-1.5 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:bg-muted"
                            aria-label="More actions"
                        >
                            <EllipsisVertical className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Files List */}
                    <div className="space-y-2">
                        {submission.media && submission.media.length > 0 ? (
                            submission.media.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center justify-between rounded-lg border p-2"
                                >
                                    <div className="flex items-center gap-2 truncate">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <span className="truncate text-sm">
                                            {file.name}
                                        </span>
                                    </div>

                                    <div className="flex gap-1">
                                        {/* View */}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                window.open(
                                                    file.original_url,
                                                    '_blank',
                                                    'noopener,noreferrer',
                                                )
                                            }
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>

                                        {/* Download */}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <a
                                                href={file.original_url}
                                                download
                                            >
                                                <Download className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No files attached
                            </p>
                        )}
                    </div>

                    {/* Info */}
                    <div className="mt-4 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="truncate text-sm font-medium">
                                {submission.field_officer?.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                Submitted on{' '}
                                {new Date(
                                    submission.created_at,
                                ).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>

                        {submission.status !== 'accepted' && (
                            <div className="space-x-2">
                                <Button
                                    variant={'ghost'}
                                    className="transition-colors duration-150 hover:bg-destructive/80"
                                >
                                    Return
                                </Button>

                                <Form
                                    {...updateStatus.form.patch({
                                        reportSubmission: submission.id,
                                    })}
                                >
                                    <Input
                                        type="hidden"
                                        name="status"
                                        value="accepted"
                                    />

                                    <Button className="bg-teal-500 hover:bg-teal-600">
                                        Accept
                                    </Button>
                                </Form>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
